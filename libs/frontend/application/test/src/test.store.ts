import type {
  ICoreStore,
  IRendererDto,
} from '@codelab/frontend/abstract/application'
import {
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { createCoreStore } from '@codelab/frontend/infra/mobx'
import { rendererFactory } from '@codelab/frontend-application-renderer/test'
import {
  apiActionFactory,
  codeActionFactory,
} from '@codelab/frontend-domain-action/test'
import { appFactory } from '@codelab/frontend-domain-app/test'
import { atomFactory } from '@codelab/frontend-domain-atom/test'
import { componentFactory } from '@codelab/frontend-domain-component/test'
import { elementFactory } from '@codelab/frontend-domain-element/test'
import { pageFactory } from '@codelab/frontend-domain-page/test'
import { propFactory } from '@codelab/frontend-domain-prop/test'
import { resourceFactory } from '@codelab/frontend-domain-resource/test'
import { Store } from '@codelab/frontend-domain-store/store'
import { storeFactory } from '@codelab/frontend-domain-store/test'
import {
  codeMirrorTypeFactory,
  fieldFactory,
  interfaceTypeFactory,
  primitiveTypeFactory,
  reactNodeTypeFactory,
  renderPropsTypeFactory,
  richTextTypeFactory,
} from '@codelab/frontend-domain-type/test'
import type {
  IApiActionDto,
  IAppDto,
  IAtomDto,
  ICodeActionDto,
  ICodeMirrorType,
  IComponentDto,
  ICreateElementDto,
  IFieldDto,
  IInterfaceTypeDto,
  IPageDto,
  IPrimitiveTypeDto,
  IPropDto,
  IReactNodeType,
  IRenderPropTypeDto,
  IRichTextType,
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
import { adminUser } from '@codelab/shared/data/test'
import { throwIfUndefined } from '@codelab/shared/utils'
import {
  Model,
  model,
  modelAction,
  prop,
  registerRootStore,
  setGlobalConfig,
  unregisterRootStore,
} from 'mobx-keystone'
import { v4 } from 'uuid'

export const createTestStore = () => {
  setGlobalConfig({
    showDuplicateModelNameWarnings: false,
  })

  const coreStore = createCoreStore(
    {
      param: {},
      query: {},
    },
    adminUser,
  )

  @model('@codelab/TestStore')
  class TestStore extends Model({
    coreStore: prop<ICoreStore>(),
  }) {
    @modelAction
    addApiAction(dto: Partial<IApiActionDto>) {
      return apiActionFactory(this.coreStore.actionService.actionDomainService)(
        dto,
      )
    }

    @modelAction
    addApp(dto: Partial<IAppDto>) {
      // console.log('addApp', dto)

      return appFactory(this.coreStore.appService.appDomainService)(dto)
    }

    @modelAction
    addAtom(dto: Partial<IAtomDto>) {
      return atomFactory(this.coreStore.atomService.atomDomainService)({
        ...dto,
        api: dto.api ?? this.addInterfaceType({}),
      })
    }

    @modelAction
    addCodeAction(dto: Partial<ICodeActionDto>) {
      return codeActionFactory(
        this.coreStore.actionService.actionDomainService,
      )(dto)
    }

    @modelAction
    addCodeMirrorType(dto: Partial<ICodeMirrorType>) {
      return codeMirrorTypeFactory(
        this.coreStore.typeService.typeDomainService,
      )(dto)
    }

    @modelAction
    addComponent(dto: Partial<IComponentDto>) {
      const id = dto.id ?? v4()

      return componentFactory(
        this.coreStore.componentService.componentDomainService,
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
      return elementFactory(this.coreStore.elementService.elementDomainService)(
        dto,
      )
    }

    @modelAction
    addField(dto: Partial<IFieldDto>) {
      return fieldFactory(this.coreStore.fieldService.fieldDomainService)(dto)
    }

    @modelAction
    addInterfaceType(dto: Partial<IInterfaceTypeDto>) {
      return interfaceTypeFactory(this.coreStore.typeService.typeDomainService)(
        dto,
      )
    }

    @modelAction
    addPage(dto: Partial<IPageDto>) {
      // console.log('addPage', dto)

      return pageFactory(this.coreStore.pageService.pageDomainService)(dto)
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
      return primitiveTypeFactory(this.coreStore.typeService.typeDomainService)(
        dto,
      )
    }

    @modelAction
    addProp(dto: Partial<IPropDto> = {}) {
      return propFactory(dto)
    }

    @modelAction
    addReactNodeType(dto: Partial<IReactNodeType>) {
      return reactNodeTypeFactory(this.coreStore.typeService.typeDomainService)(
        dto,
      )
    }

    @modelAction
    addRenderPropsType(dto: Partial<IRenderPropTypeDto>) {
      return renderPropsTypeFactory(
        this.coreStore.typeService.typeDomainService,
      )(dto)
    }

    @modelAction
    addRenderer(dto: Partial<IRendererDto>) {
      // console.log('addRenderer', dto)

      const renderer = rendererFactory(this.coreStore.rendererService)(dto)

      this.coreStore.rendererService.setActiveRenderer(rendererRef(renderer.id))

      return renderer
    }

    @modelAction
    addResource(dto: Partial<IStoreDto>) {
      return resourceFactory(
        this.coreStore.resourceService.resourceDomainService,
      )(dto)
    }

    @modelAction
    addRichTextType(dto: Partial<IRichTextType>) {
      return richTextTypeFactory(this.coreStore.typeService.typeDomainService)(
        dto,
      )
    }

    @modelAction
    addStore(dto: Partial<IStoreDto>) {
      return storeFactory(this.coreStore.storeService.storeDomainService)({
        ...dto,
        api: dto.api ?? this.addInterfaceType({}),
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

      const runtimeComponent = renderer.runtimeComponent

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
        this.coreStore.componentService.componentDomainService.add({
          id: v4(),
          name: 'Component',
        })

      const runtimeRootElement = runtimePage?.runtimeRootElement

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

      const runtimeRootElement = runtimePage?.runtimeRootElement

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
      const atomType =
        this.coreStore.atomService.atomDomainService.atomsList.find(
          (atom) => atom.type === type,
        )

      return throwIfUndefined(atomType)
    }

    getStringType() {
      return this.coreStore.typeService.typeDomainService.typesList.find(
        (type) =>
          type.kind === ITypeKind.PrimitiveType &&
          type.primitiveKind === IPrimitiveTypeKind.String,
      )
    }

    teardown() {
      unregisterRootStore(this)
    }

    protected onAttachedToRootStore() {
      const richTextType = testStore.addRichTextType({})
      const api = testStore.addInterfaceType({})

      api.writeCache({
        fields: [
          testStore.addField({
            api: { id: api.id },
            fieldType: { id: richTextType.id },
            key: 'children',
          }),
        ],
      })

      testStore.addAtom({
        api: api,
        id: IAtomType.ReactFragment,
        name: IAtomType.ReactFragment,
        type: IAtomType.ReactFragment,
      })

      testStore.addAtom({
        api: api,
        id: IAtomType.HtmlDiv,
        name: IAtomType.HtmlDiv,
        type: IAtomType.HtmlDiv,
      })

      testStore.addAtom({
        api: api,
        id: IAtomType.HtmlSpan,
        name: IAtomType.HtmlSpan,
        type: IAtomType.HtmlSpan,
      })
    }
  }

  const testStore = new TestStore({
    coreStore,
  })

  registerRootStore(testStore)

  return testStore
}
