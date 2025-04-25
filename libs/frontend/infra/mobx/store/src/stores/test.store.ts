import type {
  IApplicationStore,
  IRendererDto,
  IRootStore,
} from '@codelab/frontend-abstract-application'
import type {
  IApiActionDto,
  IAppDto,
  IAtomDto,
  ICodeActionDto,
  ICodeMirrorType,
  IComponentDto,
  IElementDto,
  IFieldDto,
  IInterfaceTypeDto,
  IPageDto,
  IPrimitiveTypeDto,
  IPropDto,
  IReactNodeType,
  IRef,
  IRenderPropTypeDto,
  IRichTextType,
  IStoreDto,
} from '@codelab/shared-abstract-core'
import type { PartialExcept } from '@codelab/shared-abstract-types'

import {
  rendererRef,
  RendererType,
} from '@codelab/frontend-abstract-application'
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
} from '@codelab/frontend-abstract-domain'
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
import { userDto } from '@codelab/frontend-test-data'
import {
  IAtomType,
  IPageKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared-abstract-core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared-config-env'
import { Validator } from '@codelab/shared-infra-typebox'
import {
  Model,
  model,
  modelAction,
  prop,
  registerRootStore,
  setGlobalConfig,
  UndoManager,
  undoMiddleware,
  unregisterRootStore,
} from 'mobx-keystone'
import { v4 } from 'uuid'

import { createApplicationStore } from './application.store'
import { createDomainStore } from './domain.store'

export enum Layout {
  Horizontal,
  Vertical,
}

export const createTestStore = (): {
  rootStore: IRootStore
  undoManager: UndoManager
} => {
  setGlobalConfig({
    showDuplicateModelNameWarnings: false,
  })

  const domainStore = createDomainStore(userDto)
  const applicationStore = createApplicationStore(domainStore)

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

      // this.domainStore.appDomainService.hydrate(dto)

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
        owner: { id },
        rootElement: this.addElement({
          parentComponent: { id },
          renderType: this.getAtomByType(IAtomType.ReactFragment),
        }),
        store: this.addStore({}),
      })
    }

    @modelAction
    addElement(dto: Partial<IElementDto>) {
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
    addPageProvider(app: IRef, id = v4(), name = 'provider') {
      const rootElementId = v4()

      return this.addPage({
        app,
        id,
        kind: IPageKind.Provider,
        name,
        pageContentContainer: { id: rootElementId },
        rootElement: this.addElement({
          closestContainerNode: { id },
          id: rootElementId,
          name: ROOT_ELEMENT_NAME,
          page: { id },
          renderType: this.getAtomByType(IAtomType.ReactFragment),
        }),
        store: this.addStore({
          name: Store.createName({ name }),
          page: { id },
        }),
      })
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

    @modelAction
    setupComponent() {
      const componentId = 'component-id'
      const rootElementId = 'root-element-id'
      const componentName = 'Component Name'

      const component = this.addComponent({
        id: componentId,
        name: componentName,
        owner: { id: v4() },
        rootElement: this.addElement({
          closestContainerNode: { id: componentId },
          id: rootElementId,
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
    setupDragAndDrop(
      layout: Layout = Layout.Horizontal,
      draggableElementFirst = true,
    ) {
      const { page, renderer } = this.setupPage(
        RendererType.PageBuilder,
        IPageKind.Regular,
      )

      // we use top/left/right/bottom as a workaround for getBoundingBoxRect
      const horizontalFirstElement: React.CSSProperties = {
        bottom: '100px',
        display: 'inline-block',
        height: '100px',
        left: '0px',
        right: '100px',
        top: '0px',
        width: '100px',
      }

      const horizontalSecondElement: React.CSSProperties = {
        bottom: '100px',
        display: 'inline-block',
        height: '100px',
        left: '100px',
        right: '200px',
        top: '0px',
        width: '100px',
      }

      const verticalFirstElement: React.CSSProperties = {
        bottom: '100px',
        display: 'block',
        height: '100px',
        left: '0px',
        right: '100px',
        top: '0px',
        width: '100px',
      }

      const verticalSecondElement: React.CSSProperties = {
        bottom: '200px',
        display: 'block',
        height: '100px',
        left: '0px',
        right: '100px',
        top: '100px',
        width: '100px',
      }

      const verticalDraggableElement = draggableElementFirst
        ? verticalFirstElement
        : verticalSecondElement

      const verticalDroppableElement = draggableElementFirst
        ? verticalSecondElement
        : verticalFirstElement

      const horizontalDraggableElement = draggableElementFirst
        ? horizontalFirstElement
        : horizontalSecondElement

      const horizontalDroppableElement = draggableElementFirst
        ? horizontalSecondElement
        : horizontalFirstElement

      const draggableElement = this.addElement({
        closestContainerNode: { id: page.id },
        name: 'Draggable Element',
        parentElement: page.rootElement,
        // jest have propblem parsing style passed by `css` prop
        props: {
          data: JSON.stringify({
            style:
              layout === Layout.Horizontal
                ? horizontalDraggableElement
                : verticalDraggableElement,
          }),
          id: v4(),
        },
        renderType: this.getAtomByType(IAtomType.HtmlDiv),
      })

      const droppableElement = this.addElement({
        name: 'Droppable element',
        parentElement: page.rootElement.current,
        props: {
          data: JSON.stringify({
            style:
              layout === Layout.Horizontal
                ? horizontalDroppableElement
                : verticalDroppableElement,
          }),
          id: v4(),
        },
        renderType: this.getAtomByType(IAtomType.HtmlDiv),
      })

      page.rootElement.current.writeCache({
        firstChild: draggableElementFirst ? draggableElement : droppableElement,
        props: {
          data: JSON.stringify({
            style: {
              bottom: '300px',
              display: layout === Layout.Horizontal ? 'inline-block' : 'block',
              height: '300px',
              left: '0px',
              right: '300px',
              top: '0px',
              width: '300px',
            },
          }),
          id: v4(),
        },
      })

      if (draggableElementFirst) {
        draggableElement.writeCache({ nextSibling: droppableElement })
      } else {
        droppableElement.writeCache({ nextSibling: draggableElement })
      }

      return {
        draggableElement,
        droppableElement,
        renderer,
      }
    }

    @modelAction
    setupPage(
      rendererType: RendererType = RendererType.Preview,
      pageKind: IPageKind = IPageKind.Regular,
    ) {
      const appId = v4()
      const providerPage = this.addPageProvider({ id: appId })

      const page =
        pageKind === IPageKind.Regular
          ? this.addPageRegular({ app: { id: appId } })
          : providerPage

      const pages =
        pageKind === IPageKind.Regular ? [providerPage, page] : [page]

      const app = this.addApp({ id: appId, pages })

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
    setupRuntimeComponent() {
      const { page, renderer, runtimePage } = this.setupPage()
      const rootElement = page.rootElement.current
      const componentId = 'component-id'

      const component = componentFactory(
        this.domainStore.componentDomainService,
      )({
        id: componentId,
        name: 'Component',
        owner: { id: componentId },
        rootElement: testRootStore.addElement({
          closestContainerNode: { id: componentId },
          parentComponent: { id: componentId },
        }),
        // Mock this here
        store: testRootStore.addStore({}),
      })

      rootElement.writeCache({
        renderType: {
          __typename: 'Component',
          id: component.id,
        },
      })

      const rendered = renderer.render

      return {
        component,
        page,
        rendered,
        renderer,
        rootElement,
        runtimeRootElement: runtimePage?.runtimeRootElement,
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
