import type {
  ICreatePageData,
  IInterfaceType,
  IPageModel,
  IPageService,
  IUpdatePageData,
} from '@codelab/frontend/abstract/core'
import {
  elementRef,
  getAppService,
  getElementService,
  getUserService,
  ROOT_ELEMENT_NAME,
  typeRef,
} from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import { getPropService } from '@codelab/frontend/domain/prop'
import {
  InlineFormService,
  ModalService,
} from '@codelab/frontend/domain/shared'
import { getStoreService, Store } from '@codelab/frontend/domain/store'
import { getTypeService, InterfaceType } from '@codelab/frontend/domain/type'
import type { PageWhere } from '@codelab/shared/abstract/codegen'
import type { IElementDTO, IPageDTO } from '@codelab/shared/abstract/core'
import {
  IElementRenderTypeKind,
  IPageKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
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
import { PageFormService } from './page-form.service'
import { PageModalService } from './page-modal.service'

@model('@codelab/PageService')
export class PageService
  extends Model({
    createForm: prop(() => new InlineFormService({})),
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new PageModalService({})),
    pageFactory: prop(() => new PageFactory({})),
    pageRepository: prop(() => new PageRepository({})),
    pages: prop(() => objectMap<IPageModel>()),
    updateForm: prop(() => new PageFormService({})),
    updateModal: prop(() => new PageModalService({})),
  })
  implements IPageService
{
  @computed
  get pagesList() {
    return [...this.pages.values()]
  }

  @modelFlow
  @transaction
  create = _async(function* (
    this: PageService,
    { app, id, name, url }: ICreatePageData,
  ) {
    const rootElementProps = this.propService.add({
      data: '{}',
      id: v4(),
    })

    const atomReactFragment = yield* _await(
      this.atomService.getDefaultElementRenderType(),
    )

    const rootElement = this.elementService.add({
      closestContainerNode: {
        id,
      },
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      page: { id },
      props: rootElementProps,
      renderType: atomReactFragment,
    })

    const appModel = this.appService.apps.get(app.id)
    const { user } = this.userService
    const userName = user.username

    const interfaceType = this.typeService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(
        `${appModel?.name}(${userName}) ${name} Store`,
      ),
    })

    const store = this.storeService.add({
      api: typeRef<IInterfaceType>(interfaceType.id),
      id: v4(),
      name: Store.createName({ name }),
    })

    const page = this.add({
      app,
      id,
      kind: IPageKind.Regular,
      name,
      rootElement: elementRef(rootElement.id),
      store,
      // for new pages we allow user to omit url, in this case we autogenerate it
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      url: url ?? `/${slugify(name)}`,
    })

    this.pages.set(page.id, page)

    /**
     * Add page to current app
     */
    appModel?.writeCache({ pages: [...appModel.pages, page] })

    yield* _await(this.pageRepository.add(page))

    return page
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: PageService, pages: Array<IPageModel>) {
    // const operations = pages.map((page) =>
    //   _async(function* (this: PageService) {
    //     this.pages.delete(page.id)
    //   }),
    // )

    const existingPages = (yield* _await(
      this.pageRepository.find({
        id_IN: pages.map((page) => page.id),
      }),
    )).items

    /**
     * Need to fetch and delete all elements, since page only has references to the rootElement
     */
    const elements = existingPages.flatMap((page) =>
      [page.rootElement, ...page.rootElement.descendantElements].map(
        (element) =>
          this.elementService.add({
            ...element,
            closestContainerNode: {
              id: page.id,
            },
          }),
      ),
    )

    yield* _await(this.elementService.elementRepository.delete(elements))

    // yield*
    /**
     * Page can delete all other info
     */
    yield* _await(this.pageRepository.delete(pages))
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: PageService, where: PageWhere) {
    const { items: pages } = yield* _await(this.pageRepository.find(where))

    /**
     * Load elements so they can be referenced
     */
    return pages.map((page) => {
      const elements = [
        page.rootElement,
        ...page.rootElement.descendantElements,
      ]

      elements.forEach((element) =>
        this.elementService.add({
          ...element,
          closestContainerNode: {
            id: page.id,
          },
        }),
      )

      return this.add(page)
    })
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: PageService, id: string) {
    const pages = yield* _await(this.getAll({ id }))

    return pages[0]
  })

  /**
    This function fetches all data related to the specific page.
   */
  @modelFlow
  @transaction
  getRenderedPage = _async(function* (this: PageService, pageId: string) {
    return yield* _await(pageApi.GetRenderedPage({ pageId }))
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: PageService,
    { app, id, name, pageContentContainer, url }: IUpdatePageData,
  ) {
    const page = this.pages.get(id)!

    page.writeCache({
      app,
      name,
      pageContentContainer,
      url,
    })

    yield* _await(this.pageRepository.update(page))

    return page!
  })

  @modelAction
  add = (pageDTO: IPageDTO) => {
    console.debug('PageService.add()', pageDTO)

    let page = this.pages.get(pageDTO.id)

    if (page) {
      page.writeCache(pageDTO)
    } else {
      page = Page.create(pageDTO)
      this.pages.set(page.id, page)
    }

    return page
  }

  /**
   * Since elements are
   */
  @modelAction
  loadElements = (elements: Array<IElementDTO>) => {
    elements.forEach((element) => {
      this.propService.add(element.props)

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
        // this.atomService.add(element.renderType)
      }

      const elementDto = {
        ...element,
      }

      console.log('AppService.loadPages() elementDto', elementDto)

      this.elementService.add(elementDto)
    })
  }

  page(id: string) {
    return this.pages.get(id)
  }

  pagesByApp(appId: string) {
    return this.pagesList.filter((page) => page.app.id === appId)
  }

  @computed
  private get appService() {
    return getAppService(this)
  }

  @computed
  private get atomService() {
    return getAtomService(this)
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
  private get storeService() {
    return getStoreService(this)
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }

  @computed
  private get userService() {
    return getUserService(this)
  }
}
