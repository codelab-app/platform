import type {
  ICreatePageData,
  IPage,
  IPageDTO,
  IPageService,
  IUpdatePageData,
} from '@codelab/frontend/abstract/core'
import {
  elementRef,
  getAppService,
  getElementService,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { getPropService } from '@codelab/frontend/domain/prop'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { PageWhere } from '@codelab/shared/abstract/codegen'
import { IPageKind } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { PageFactory } from '../services'
import { pageApi } from './page.api'
import { Page } from './page.model'
import { PageRepository } from './page.repo'
import { PageModalService } from './page-modal.service'

@model('@codelab/PageService')
export class PageService
  extends Model({
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new PageModalService({})),
    pageFactory: prop(() => new PageFactory({})),
    pageRepository: prop(() => new PageRepository({})),
    pages: prop(() => objectMap<IPage>()),
    updateModal: prop(() => new PageModalService({})),
  })
  implements IPageService
{
  /**
    This function fetches all data related to the specific page.
   */
  @modelFlow
  @transaction
  getRenderedPage = _async(function* (this: PageService, pageId: string) {
    return yield* _await(pageApi.GetRenderedPage({ pageId }))
  })

  @computed
  private get appService() {
    return getAppService(this)
  }

  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get propService() {
    return getPropService(this)
  }

  @computed
  get pagesList() {
    return [...this.pages.values()]
  }

  pagesByApp(appId: string) {
    return this.pagesList.filter((page) => page.app.id === appId)
  }

  page(id: string) {
    return this.pages.get(id)
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: PageService,
    { app, id, name, pageContentContainer }: IUpdatePageData,
  ) {
    const page = this.pages.get(id)!

    page.writeCache({
      app,
      name,
      pageContentContainer,
    })

    yield* _await(this.pageRepository.update(page))

    return page!
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: PageService, where: PageWhere) {
    const pages = yield* _await(this.pageRepository.find(where))

    return pages.map((page) => this.add(page))
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: PageService, id: string) {
    const pages = yield* _await(this.getAll({ id }))

    return pages[0]
  })

  @modelFlow
  @transaction
  create = _async(function* (
    this: PageService,
    { app, id, name }: ICreatePageData,
  ) {
    const rootElementProps = this.propService.add({
      data: '{}',
      id: v4(),
    })

    const rootElement = this.elementService.add({
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      props: rootElementProps,
    })

    const page = this.add({
      app,
      id,
      kind: IPageKind.Regular,
      name,
      rootElement: elementRef(rootElement.id),
    })

    this.pages.set(page.id, page)

    /**
     * Add page to current app
     */
    const appModel = this.appService.apps.get(app.id)
    appModel?.writeCache({ pages: [...appModel.pages, page] })

    yield* _await(this.pageRepository.add(page))

    return page
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: PageService, page: IPage) {
    const { id } = page
    this.pages.delete(id)

    yield* _await(this.pageRepository.delete([page]))

    return page!
  })

  @modelAction
  add = (pageDTO: IPageDTO) => {
    let page = this.pages.get(pageDTO.id)

    if (page) {
      page.writeCache(pageDTO)
    } else {
      page = Page.create(pageDTO)
      this.pages.set(page.id, page)
    }

    return page
  }
}
