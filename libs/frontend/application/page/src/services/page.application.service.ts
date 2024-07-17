import {
  getAppService,
  getElementService,
  getRendererService,
  getUserService,
  type IPageApplicationService,
} from '@codelab/frontend/abstract/application'
import type { IPageModel } from '@codelab/frontend/abstract/domain'
import {
  getAtomDomainService,
  getStoreDomainService,
} from '@codelab/frontend/abstract/domain'
import { PageDomainService } from '@codelab/frontend-domain-page/services'
import { getTypeDomainService } from '@codelab/frontend-domain-type/services'
import type { PageWhere } from '@codelab/shared/abstract/codegen'
import type { IElementDto } from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { pageApi } from './page.api'
import { PageRepository } from './page.repo'

@model('@codelab/PageApplicationService')
export class PageApplicationService
  extends Model({
    pageDomainService: prop(() => new PageDomainService({})),
    pageRepository: prop(() => new PageRepository({})),
  })
  implements IPageApplicationService
{
  @modelFlow
  @transaction
  delete = _async(function* (
    this: PageApplicationService,
    pagesModel: Array<IPageModel>,
  ) {
    const existingPages = (yield* _await(
      this.pageRepository.find({
        id_IN: pagesModel.map((page) => page.id),
      }),
    )).items

    /**
     * Need to fetch and delete all elements, since page only has references to the rootElement
     */
    const elements = existingPages.flatMap((page) => page.elements)

    elements.forEach((element) =>
      this.elementService.elementDomainService.elements.delete(element.id),
    )

    pagesModel.forEach((page) => {
      this.rendererService.renderers.delete(page.id)

      this.pageDomainService.pages.delete(page.id)
    })

    yield* _await(this.elementService.elementRepository.delete(elements))

    /**
     * Page can delete all other info
     */
    yield* _await(this.pageRepository.delete(pagesModel))
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: PageApplicationService, where: PageWhere) {
    const { items: pages } = yield* _await(this.pageRepository.find(where))

    return pages.map((page) => this.pageDomainService.hydrate(page))
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: PageApplicationService, id: string) {
    const pages = yield* _await(this.getAll({ id }))

    return pages[0]
  })

  /**
    This function fetches all data related to the specific page.
   */
  @modelFlow
  @transaction
  getRenderedPage = _async(function* (
    this: PageApplicationService,
    pageId: string,
  ) {
    return yield* _await(pageApi.GetRenderedPage({ pageId }))
  })

  @modelFlow
  getSelectPageOptions = _async(function* (
    this: PageApplicationService,
    appId?: string,
  ) {
    const pages = yield* _await(
      this.getAll({ appConnection: { node: { id: appId } } }),
    )

    return pages.map((page) => ({
      label: page.name,
      value: page.id,
    }))
  })

  // @modelFlow
  // @transaction
  // update = _async(function* (
  //   this: PageApplicationService,
  //   { app, id, name, pageContentContainer, url }: IUpdatePageData,
  // ) {
  //   const page = this.pageDomainService.pages.get(id)!

  //   page.writeCache({
  //     app,
  //     name,
  //     pageContentContainer,
  //     url,
  //   })

  //   yield* _await(this.pageRepository.update(page))

  //   return page!
  // })

  @modelAction
  getPagesByApp = (appId: string) => {
    return this.pageDomainService.pagesList.filter(
      (page) => page.app.id === appId,
    )
  }

  /**
   * Since elements are
   */
  @modelAction
  loadElements = (elements: Array<IElementDto>) => {
    elements.forEach((element) => {
      /**
       * Element comes with `component` or `atom` data that we need to load as well
       *
       * TODO: Need to handle component case
       */
      if (element.renderType.__typename === IElementRenderTypeKind.Atom) {
        // this.elementService.loadRenderType(element.renderType)
        // TODO: Load from elementAggregateRoot, which contains nested data
        // this.typeService.loadTypes({
        //   interfaceTypes: [element.renderType.api],
        // })
        // element.renderType.tags.forEach((tag) => this.tagService.add(tag))
        // this.atomService.atomDomainService.add(element.renderType)
      }

      console.log('AppService.loadPages() element', element)

      this.elementService.elementDomainService.hydrate(element)
    })
  }

  @computed
  private get appService() {
    return getAppService(this)
  }

  @computed
  private get atomDomainService() {
    return getAtomDomainService(this)
  }

  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get rendererService() {
    return getRendererService(this)
  }

  @computed
  private get storeDomainService() {
    return getStoreDomainService(this)
  }

  @computed
  private get typeDomainService() {
    return getTypeDomainService(this)
  }

  @computed
  private get userService() {
    return getUserService(this)
  }
}
