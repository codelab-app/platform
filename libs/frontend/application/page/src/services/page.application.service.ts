import {
  getAppService,
  getElementService,
  getRendererService,
  getUserService,
  type IPageApplicationService,
} from '@codelab/frontend/abstract/application'
import type {
  ICreatePageFormData,
  IInterfaceTypeModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import {
  elementRef,
  getAtomDomainService,
  getStoreDomainService,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import {
  InlineFormService,
  ModalService,
} from '@codelab/frontend/application/shared/store'
import { PageDomainService } from '@codelab/frontend/domain/page'
import { Store } from '@codelab/frontend/domain/store'
import {
  getTypeDomainService,
  InterfaceType,
} from '@codelab/frontend/domain/type'
import type { PageWhere } from '@codelab/shared/abstract/codegen'
import type { IElementDto, IPropDto } from '@codelab/shared/abstract/core'
import {
  IElementRenderTypeKind,
  IPageKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { slugify, throwIfUndefined } from '@codelab/shared/utils'
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
import { v4 } from 'uuid'
import { pageApi } from './page.api'
import { PageRepository } from './page.repo'
import { PageFormService } from './page-form.service'
import { PageModalService } from './page-modal.service'

@model('@codelab/PageApplicationService')
export class PageApplicationService
  extends Model({
    createForm: prop(() => new InlineFormService({})),
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new PageModalService({})),
    pageDomainService: prop(() => new PageDomainService({})),
    pageRepository: prop(() => new PageRepository({})),
    updateForm: prop(() => new PageFormService({})),
    updateModal: prop(() => new PageModalService({})),
  })
  implements IPageApplicationService
{
  @modelFlow
  @transaction
  create = _async(function* (
    this: PageApplicationService,
    { app, id, name, url }: ICreatePageFormData,
  ) {
    const rootElementProps: IPropDto = {
      data: '{}',
      id: v4(),
    }

    const rootElement = this.elementService.elementDomainService.hydrate({
      closestContainerNode: {
        id,
      },
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      page: { id },
      props: rootElementProps,
      renderType: this.atomDomainService.defaultRenderType,
    })

    const appModel = throwIfUndefined(
      this.appService.appDomainService.apps.get(app.id),
    )

    const { user } = this.userService
    const userName = user.username

    const interfaceType = this.typeDomainService.hydrateInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(
        `${appModel.name}(${userName}) ${name} Store`,
      ),
    })

    const store = this.storeDomainService.hydrate({
      api: typeRef<IInterfaceTypeModel>(interfaceType.id),
      id: v4(),
      name: Store.createName({ name }),
    })

    const page = this.pageDomainService.hydrate({
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

    yield* _await(this.pageRepository.add(page))

    return page
  })

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

  @modelAction
  getPagesByApp = (appId: string) => {
    return this.pageDomainService.pagesList.filter(
      (page) => page.app.id === appId,
    )
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

  @computed get rendererService() {
    return getRendererService(this)
  }
}
