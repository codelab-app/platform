import type {
  IRendererDto,
  IRootStore,
} from '@codelab/frontend/abstract/application'
import {
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { rendererFactory } from '@codelab/frontend/application/renderer'
import {
  apiActionFactory,
  codeActionFactory,
} from '@codelab/frontend/domain/action'
import { appFactory } from '@codelab/frontend/domain/app'
import { atomFactory } from '@codelab/frontend/domain/atom'
import { componentFactory } from '@codelab/frontend/domain/component'
import { elementFactory } from '@codelab/frontend/domain/element'
import { pageFactory } from '@codelab/frontend/domain/page'
import { propFactory } from '@codelab/frontend/domain/prop'
import { resourceFactory } from '@codelab/frontend/domain/resource'
import { Store, storeFactory } from '@codelab/frontend/domain/store'
import {
  fieldFactory,
  interfaceTypeFactory,
  primitiveTypeFactory,
  reactNodeTypeFactory,
  renderPropsTypeFactory,
} from '@codelab/frontend/domain/type'
import { createRootStore } from '@codelab/frontend/infra/mobx'
import type {
  IApiActionDto,
  IAppDto,
  IAtomDto,
  ICodeActionDto,
  IComponentDto,
  ICreateElementDto,
  IFieldDto,
  IInterfaceTypeDto,
  IPageDto,
  IPrimitiveTypeDto,
  IPropDto,
  IReactNodeType,
  IRenderPropTypeDto,
  IStoreDto,
} from '@codelab/shared/abstract/core'
import {
  IAtomType,
  IPageKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { PartialExcept } from '@codelab/shared/abstract/types'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import {
  Model,
  model,
  modelAction,
  prop,
  registerRootStore,
} from 'mobx-keystone'
import { v4 } from 'uuid'

export const createTestApplication = () => {
  const rootStore = createRootStore({})

  @model('@codelab/TestApplication')
  class TestApplication extends Model({
    rootStore: prop<IRootStore>(),
  }) {
    @modelAction
    addApiAction(dto: Partial<IApiActionDto>) {
      return apiActionFactory(this.rootStore.actionService.actionDomainService)(
        dto,
      )
    }

    @modelAction
    addApp(dto: Partial<IAppDto>) {
      // console.log('addApp', dto)

      return appFactory(this.rootStore.appService.appDomainService)(dto)
    }

    @modelAction
    addAtom(dto: Partial<IAtomDto>) {
      return atomFactory(this.rootStore.atomService.atomDomainService)({
        ...dto,
        api: dto.api ?? this.addInterfaceType({}),
      })
    }

    @modelAction
    addCodeAction(dto: Partial<ICodeActionDto>) {
      return codeActionFactory(
        this.rootStore.actionService.actionDomainService,
      )(dto)
    }

    @modelAction
    addComponent(dto: Partial<IComponentDto>) {
      const id = dto.id ?? v4()

      return componentFactory(
        this.rootStore.componentService.componentDomainService,
      )({
        ...dto,
        api: dto.api ?? this.addInterfaceType({}),
        id,
        rootElement: this.addElement({
          parentComponent: { id },
          renderType: this.getAtomByType(IAtomType.ReactFragment),
        }),
        store: this.addStore({}),
      })
    }

    @modelAction
    addElement(dto: Partial<ICreateElementDto>) {
      return elementFactory(this.rootStore.elementService.elementDomainService)(
        dto,
      )
    }

    @modelAction
    addField(dto: Partial<IFieldDto>) {
      return fieldFactory(this.rootStore.fieldService.fieldDomainService)(dto)
    }

    @modelAction
    addInterfaceType(dto: Partial<IInterfaceTypeDto>) {
      return interfaceTypeFactory(this.rootStore.typeService.typeDomainService)(
        dto,
      )
    }

    @modelAction
    addPage(dto: Partial<IPageDto>) {
      // console.log('addPage', dto)

      return pageFactory(this.rootStore.pageService.pageDomainService)(dto)
    }

    @modelAction
    addPageRegular({
      app,
      id = v4(),
      name = 'Test Page',
    }: PartialExcept<IPageDto, 'app'>) {
      return this.addPage({
        app,
        id,
        kind: IPageKind.Regular,
        name,
        rootElement: this.addElement({
          closestContainerNode: { id },
          name: ROOT_ELEMENT_NAME,
          page: { id },
          renderType: this.getAtomByType(IAtomType.HtmlDiv),
        }),
        store: this.addStore({
          name: Store.createName({ name }),
          page: { id },
        }),
      })
    }

    @modelAction
    addPrimitiveType(dto: Partial<IPrimitiveTypeDto>) {
      return primitiveTypeFactory(this.rootStore.typeService.typeDomainService)(
        dto,
      )
    }

    @modelAction
    addProp(dto: Partial<IPropDto>) {
      return propFactory(dto)
    }

    @modelAction
    addReactNode(dto: Partial<IReactNodeType>) {
      return reactNodeTypeFactory(this.rootStore.typeService.typeDomainService)(
        dto,
      )
    }

    @modelAction
    addRenderProps(dto: Partial<IRenderPropTypeDto>) {
      return renderPropsTypeFactory(
        this.rootStore.typeService.typeDomainService,
      )(dto)
    }

    @modelAction
    addRenderer(dto: Partial<IRendererDto>) {
      // console.log('addRenderer', dto)

      const renderer = rendererFactory(this.rootStore.rendererService)(dto)

      this.rootStore.rendererService.setActiveRenderer(rendererRef(renderer.id))

      return renderer
    }

    @modelAction
    addResource(dto: Partial<IStoreDto>) {
      return resourceFactory(
        this.rootStore.resourceService.resourceDomainService,
      )(dto)
    }

    @modelAction
    addStore(dto: Partial<IStoreDto>) {
      return storeFactory(this.rootStore.storeService.storeDomainService)({
        ...dto,
        api: dto.api ?? this.addInterfaceType({}),
      })
    }

    @modelAction
    init() {
      this.clear()

      const reactFragment = testApplication.addAtom({
        id: IAtomType.ReactFragment,
        name: IAtomType.ReactFragment,
        type: IAtomType.ReactFragment,
      })

      const htmlDivAtom = testApplication.addAtom({
        id: IAtomType.HtmlDiv,
        name: IAtomType.HtmlDiv,
        type: IAtomType.HtmlDiv,
      })
    }

    @modelAction
    setupComponent() {
      const componentId = 'component-id'
      const rootElementId = 'root-element-id'
      const componentName = 'Component Name'

      const component = this.addComponent({
        id: componentId,
        name: componentName,
        rootElement: this.addElement({
          closestContainerNode: { id: componentId },
          name: ROOT_ELEMENT_NAME,
          parentComponent: { id: componentId },
          renderType: this.getAtomByType(IAtomType.HtmlDiv),
        }),
        store: this.addStore({
          component: { id: componentId },
          name: Store.createName({ name: componentName }),
        }),
      })

      const renderer = this.addRenderer({
        containerNode: component,
        rendererType: RendererType.Preview,
      })

      const runtimeComponent = renderer.runtimeComponent!

      return { component, renderer, runtimeComponent }
    }

    @modelAction
    setupPage(
      rendererType: RendererType = RendererType.Preview,
      pageKind: IPageKind = IPageKind.Regular,
    ) {
      const app = this.addApp({})

      const page =
        pageKind === IPageKind.Regular
          ? this.addPageRegular({ app })
          : app.providerPage

      // page.rootElement.current.writeCache({ renderType: this.getDivAtom() })

      const renderer = this.addRenderer({
        containerNode: page,
        id: v4(),
        rendererType,
      })

      return {
        app,
        page,
        rendered: renderer.render,
        renderer,
        runtimePage:
          pageKind === IPageKind.Regular
            ? renderer.runtimePage?.childPage?.current
            : renderer.runtimePage,
        runtimeProviderPage:
          pageKind === IPageKind.Regular ? renderer.runtimePage : undefined,
      }
    }

    @modelAction
    setupRuntimeComponent(
      rendererType: RendererType = RendererType.Preview,
      pageKind: IPageKind = IPageKind.Regular,
    ) {
      const { page, rendered, renderer, runtimePage } = this.setupPage(
        rendererType,
        pageKind,
      )

      const rootElement = page.rootElement.current

      const component =
        this.rootStore.componentService.componentDomainService.add({
          id: v4(),
          name: 'Component',
        })

      const runtimeRootElement = runtimePage!.runtimeRootElement

      rootElement.writeCache({ renderType: component })

      return {
        component,
        page,
        rendered,
        renderer,
        rootElement,
        runtimeRootElement: runtimeRootElement,
      }
    }

    @modelAction
    setupRuntimeElement(
      rendererType: RendererType = RendererType.Preview,
      pageKind: IPageKind = IPageKind.Regular,
    ) {
      const { page, rendered, renderer, runtimePage } = this.setupPage(
        rendererType,
        pageKind,
      )

      const runtimeRootElement = runtimePage!.runtimeRootElement

      return {
        page,
        rendered,
        renderer,
        rootElement: page.rootElement.current,
        runtimePage,
        runtimeRootElement: runtimeRootElement,
      }
    }

    getAtomByType(type: IAtomType) {
      return this.rootStore.atomService.atomDomainService.atomsList.find(
        (atom) => atom.type === type,
      )
    }

    getStringType() {
      return this.rootStore.typeService.typeDomainService.typesList.find(
        (type) =>
          type.kind === ITypeKind.PrimitiveType &&
          type.primitiveKind === IPrimitiveTypeKind.String,
      )
    }

    @modelAction
    private clear() {
      this.rootStore.clear()
    }
  }

  const testApplication = new TestApplication({
    rootStore,
  })

  registerRootStore(testApplication)

  return testApplication
}
