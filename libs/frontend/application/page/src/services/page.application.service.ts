import {
  getAppService,
  getElementService,
  getUserService,
  type IPageApplicationService,
} from '@codelab/frontend/abstract/application'
import type {
  ICreatePageData,
  IInterfaceTypeModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import { elementRef, typeRef } from '@codelab/frontend/abstract/domain'
import { getAtomService } from '@codelab/frontend/application/atom'
import { getPropService } from '@codelab/frontend/application/prop'
import { getStoreService } from '@codelab/frontend/application/store'
import { getTypeService } from '@codelab/frontend/application/type'
import {
  InlineFormService,
  ModalService,
} from '@codelab/frontend/domain/shared'
import { Store } from '@codelab/frontend/domain/store'
import { InterfaceType } from '@codelab/frontend/domain/type'
import type { PageWhere } from '@codelab/shared/abstract/codegen'
import type { IElementDTO, IPropDTO } from '@codelab/shared/abstract/core'
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
  clone,
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
    { app, id, name, url }: ICreatePageData,
  ) {
    const rootElementProps: IPropDTO = {
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
      renderType: this.atomService.atomDomainService.defaultRenderType,
    })

    const appModel = throwIfUndefined(
      this.appService.appDomainService.apps.get(app.id),
    )

    const { user } = this.userService
    const userName = user.username

    const interfaceType = this.typeService.typeDomainService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(
        `${appModel.name}(${userName}) ${name} Store`,
      ),
    })

    const store = this.storeService.storeDomainService.add({
      api: typeRef<IInterfaceTypeModel>(interfaceType.id),
      id: v4(),
      name: Store.createName({ name }),
    })

    const page = appModel.addPageInCache({
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
    const elements = existingPages.flatMap((page) => [
      page.rootElement,
      ...page.rootElement.descendantElements,
    ])

    elements.forEach((element) =>
      this.elementService.elementDomainService.elements.delete(element.id),
    )

    yield* _await(this.elementService.elementRepository.delete(elements))

    // pagesModel.forEach((page) => this.pageDomainService.pages.delete(page.id))

    /**
     * Page can delete all other info
     */
    yield* _await(this.pageRepository.delete(pagesModel))
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: PageApplicationService, where: PageWhere) {
    const { items: pages } = yield* _await(this.pageRepository.find(where))

    return pages

    /**
     * Load elements so they can be referenced
     */
    // return pages.map((page) => {
    //   const elements = [
    //     page.rootElement,
    //     ...page.rootElement.descendantElements,
    //   ]

    //   elements.forEach((element) =>
    //     this.elementService.elementDomainService.hydrate({
    //       ...element,
    //       closestContainerNode: {
    //         id: page.id,
    //       },
    //     }),
    //   )

    //   return this.pageDomainService.add(page)
    // })
  })

  // @modelFlow
  // @transaction
  // getOne = _async(function* (this: PageApplicationService, id: string) {
  //   const pages = yield* _await(this.getAll({ id }))

  //   return pages[0]
  // })

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
  loadElements = (elements: Array<IElementDTO>) => {
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
