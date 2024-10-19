import type {
  IApplicationStore,
  IRendererDto,
  IRootStore,
} from '@codelab/frontend/abstract/application'
import type {
  IApiActionDto,
  IAppDto,
  IAtomDto,
  ICodeActionDto,
  ICodeMirrorType,
  IComponentDto,
  IElementCreateDto,
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
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import {
  actionDomainServiceContext,
  appDomainServiceContext,
  atomDomainServiceContext,
  authGuardDomainServiceContext,
  componentDomainServiceContext,
  domainDomainServiceContext,
  elementDomainServiceContext,
  fieldDomainServiceContext,
  IDomainStore,
  pageDomainServiceContext,
  redirectDomainServiceContext,
  resourceDomainServiceContext,
  storeDomainServiceContext,
  tagDomainServiceContext,
  typeDomainServiceContext,
  userDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import { preferenceDto, userDto } from '@codelab/frontend/test/data'
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
import {
  IAtomType,
  IPageKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { PartialExcept } from '@codelab/shared/abstract/types'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { Validator } from '@codelab/shared/infra/schema'
import {
  Model,
  model,
  modelAction,
  prop,
  registerRootStore,
  setGlobalConfig,
  undoMiddleware,
  unregisterRootStore,
} from 'mobx-keystone'
import { v4 } from 'uuid'

import { createApplicationStore } from './application.store'
import { createDomainStore } from './domain.store'

export const createTestStore = () => {
  setGlobalConfig({
    showDuplicateModelNameWarnings: false,
  })

  const domainStore = createDomainStore(userDto, preferenceDto)

  const applicationStore = createApplicationStore(
    { pathParams: {} },
    domainStore,
  )

  @model('@codelab/TestRootStore')
  class TestRootStore
    extends Model({
      applicationStore: prop<IApplicationStore>(() => applicationStore),
      domainStore: prop<IDomainStore>(() => domainStore),
    })
    implements IRootStore
  {
    @modelAction
    addApiAction(dto: Partial<IApiActionDto>) {
      return apiActionFactory(this.domainStore.actionDomainService)(dto)
    }

    @modelAction
    addApp(dto: Partial<IAppDto>) {
      // console.log('addApp', dto)

      return appFactory(this.domainStore.appDomainService)(dto)
    }

    @modelAction
    addAtom(dto: Partial<IAtomDto>) {
      return atomFactory(this.domainStore.atomDomainService)({
        ...dto,
        api: dto.api ?? this.addInterfaceType({}),
      })
    }

    @modelAction
    addCodeAction(dto: Partial<ICodeActionDto>) {
      return codeActionFactory(this.domainStore.actionDomainService)(dto)
    }

    @modelAction
    addCodeMirrorType(dto: Partial<ICodeMirrorType>) {
      return codeMirrorTypeFactory(this.domainStore.typeDomainService)(dto)
    }

    @modelAction
    addComponent(dto: Partial<IComponentDto>) {
      const id = dto.id ?? v4()

      return componentFactory(this.domainStore.componentDomainService)({
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
    addElement(dto: Partial<IElementCreateDto>) {
      return elementFactory(this.domainStore.elementDomainService)(dto)
    }

    @modelAction
    addField(dto: Partial<IFieldDto>) {
      return fieldFactory(this.domainStore.fieldDomainService)(dto)
    }

    @modelAction
    addInterfaceType(dto: Partial<IInterfaceTypeDto>) {
      return interfaceTypeFactory(this.domainStore.typeDomainService)(dto)
    }

    @modelAction
    addPage(dto: Partial<IPageDto>) {
      // console.log('addPage', dto)

      return pageFactory(this.domainStore.pageDomainService)(dto)
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
      return primitiveTypeFactory(this.domainStore.typeDomainService)(dto)
    }

    @modelAction
    addProp(dto: Partial<IPropDto> = {}) {
      return propFactory(dto)
    }

    @modelAction
    addReactNodeType(dto: Partial<IReactNodeType>) {
      return reactNodeTypeFactory(this.domainStore.typeDomainService)(dto)
    }

    @modelAction
    addRenderPropsType(dto: Partial<IRenderPropTypeDto>) {
      return renderPropsTypeFactory(this.domainStore.typeDomainService)(dto)
    }

    @modelAction
    addRenderer(dto: Partial<IRendererDto>) {
      // console.log('addRenderer', dto)

      const renderer = rendererFactory(this.applicationStore.rendererService)(
        dto,
      )

      this.applicationStore.rendererService.setActiveRenderer(
        rendererRef(renderer.id),
      )

      return renderer
    }

    @modelAction
    addResource(dto: Partial<IStoreDto>) {
      return resourceFactory(this.domainStore.resourceDomainService)(dto)
    }

    @modelAction
    addRichTextType(dto: Partial<IRichTextType>) {
      return richTextTypeFactory(this.domainStore.typeDomainService)(dto)
    }

    @modelAction
    addStore(dto: Partial<IStoreDto>) {
      return storeFactory(this.domainStore.storeDomainService)({
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

      const component = this.domainStore.componentDomainService.add({
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

      Validator.assertsDefined(runtimeRootElement)

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
      const atomType = this.domainStore.atomDomainService.atomsList.find(
        (atom) => atom.type === type,
      )

      Validator.assertsDefined(atomType)

      return atomType
    }

    getStringType() {
      return this.domainStore.typeDomainService.typesList.find(
        (type) =>
          type.kind === ITypeKind.PrimitiveType &&
          type.primitiveKind === IPrimitiveTypeKind.String,
      )
    }

    teardown() {
      unregisterRootStore(this)
    }

    protected onAttachedToRootStore() {
      const richTextType = testRootStore.addRichTextType({})
      const api = testRootStore.addInterfaceType({})

      api.writeCache({
        fields: [
          testRootStore.addField({
            api: { id: api.id },
            fieldType: { id: richTextType.id },
            key: 'children',
          }),
        ],
      })

      testRootStore.addAtom({
        api: api,
        id: IAtomType.ReactFragment,
        name: IAtomType.ReactFragment,
        type: IAtomType.ReactFragment,
      })

      testRootStore.addAtom({
        api: api,
        id: IAtomType.HtmlDiv,
        name: IAtomType.HtmlDiv,
        type: IAtomType.HtmlDiv,
      })

      testRootStore.addAtom({
        api: api,
        id: IAtomType.HtmlSpan,
        name: IAtomType.HtmlSpan,
        type: IAtomType.HtmlSpan,
      })
    }

    protected onInit(): void {
      actionDomainServiceContext.set(this, this.domainStore.actionDomainService)
      appDomainServiceContext.set(this, this.domainStore.appDomainService)
      atomDomainServiceContext.set(this, this.domainStore.atomDomainService)
      authGuardDomainServiceContext.set(
        this,
        this.domainStore.authGuardDomainService,
      )
      componentDomainServiceContext.set(
        this,
        this.domainStore.componentDomainService,
      )
      domainDomainServiceContext.set(this, this.domainStore.domainDomainService)
      elementDomainServiceContext.set(
        this,
        this.domainStore.elementDomainService,
      )
      fieldDomainServiceContext.set(this, this.domainStore.fieldDomainService)
      pageDomainServiceContext.set(this, this.domainStore.pageDomainService)
      redirectDomainServiceContext.set(
        this,
        this.domainStore.redirectDomainService,
      )
      resourceDomainServiceContext.set(
        this,
        this.domainStore.resourceDomainService,
      )
      storeDomainServiceContext.set(this, this.domainStore.storeDomainService)
      tagDomainServiceContext.set(this, this.domainStore.tagDomainService)
      typeDomainServiceContext.set(this, this.domainStore.typeDomainService)
      userDomainServiceContext.set(this, this.domainStore.userDomainService)
    }
  }

  const testRootStore = new TestRootStore({})
  const undoManager = undoMiddleware(testRootStore)

  registerRootStore(testRootStore)

  return { rootStore: testRootStore, undoManager }
}
