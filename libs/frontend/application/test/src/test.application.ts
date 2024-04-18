import type {
  IRendererDto,
  IRootStore,
  IRootStoreDtoTest,
} from '@codelab/frontend/abstract/application'
import {
  componentServiceContext,
  elementServiceContext,
  rendererRef,
  rendererServiceContext,
  RendererType,
  routerServiceContext,
  runtimeComponentServiceContext,
  runtimeElementServiceContext,
  runtimePageServiceContext,
} from '@codelab/frontend/abstract/application'
import {
  actionDomainServiceContext,
  appDomainServiceContext,
  atomDomainServiceContext,
  componentDomainServiceContext,
  elementDomainServiceContext,
  fieldDomainServiceContext,
  pageDomainServiceContext,
  resourceDomainServiceContext,
  storeDomainServiceContext,
  userDomainServiceContext,
} from '@codelab/frontend/abstract/domain'
import { AppService } from '@codelab/frontend/application/app'
import { AtomService } from '@codelab/frontend/application/atom'
import { ComponentApplicationService } from '@codelab/frontend/application/component'
import { ElementService } from '@codelab/frontend/application/element'
import { PageApplicationService } from '@codelab/frontend/application/page'
import {
  PropService,
  propServiceContext,
} from '@codelab/frontend/application/prop'
import {
  RendererApplicationService,
  rendererFactory,
  RuntimeComponentService,
  RuntimeElementService,
  RuntimePageService,
} from '@codelab/frontend/application/renderer'
import { ResourceService } from '@codelab/frontend/application/resource'
import { RouterService } from '@codelab/frontend/application/shared/store'
import {
  ActionService,
  StoreService,
} from '@codelab/frontend/application/store'
import { FieldService, TypeService } from '@codelab/frontend/application/type'
import { UserService } from '@codelab/frontend/application/user'
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
  typeDomainServiceContext,
} from '@codelab/frontend/domain/type'
import { createRootStore } from '@codelab/frontend/infra/mobx'
import type {
  IApiActionDto,
  IAppDto,
  IAtomDto,
  IAtomRenderType,
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
import type { PartialExcept } from '@codelab/shared/abstract/types'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { auth0IdToken } from '@codelab/shared/data/test'
import { Model, model, objectMap, prop, registerRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'

export const createTestApplication = () => {
  const rootStore = createRootStore({})

  @model('@codelab/TestApplication')
  class TestApplication extends Model({
    atomRefs: prop(() => objectMap<IAtomRenderType>()),
    rootStore: prop<IRootStore>(),
  }) {
    addApiAction(dto: Partial<IApiActionDto>) {
      return apiActionFactory(this.rootStore.actionService.actionDomainService)(
        dto,
      )
    }

    addApp(dto: Partial<IAppDto>) {
      // console.log('addApp', dto)

      return appFactory(this.rootStore.appService.appDomainService)(dto)
    }

    addAtom(dto: Partial<IAtomDto>) {
      return atomFactory(this.rootStore.atomService.atomDomainService)({
        ...dto,
        api: dto.api ?? this.addInterfaceType({}),
      })
    }

    addCodeAction(dto: Partial<ICodeActionDto>) {
      return codeActionFactory(
        this.rootStore.actionService.actionDomainService,
      )(dto)
    }

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
          renderType: this.atomRefs.get(IAtomType.ReactFragment),
        }),
        store: this.addStore({}),
      })
    }

    addElement(dto: Partial<ICreateElementDto>) {
      return elementFactory(this.rootStore.elementService.elementDomainService)(
        dto,
      )
    }

    addField(dto: Partial<IFieldDto>) {
      return fieldFactory(this.rootStore.fieldService.fieldDomainService)(dto)
    }

    addInterfaceType(dto: Partial<IInterfaceTypeDto>) {
      return interfaceTypeFactory(this.rootStore.typeService.typeDomainService)(
        dto,
      )
    }

    addPage(dto: Partial<IPageDto>) {
      // console.log('addPage', dto)

      return pageFactory(this.rootStore.pageService.pageDomainService)(dto)
    }

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
          renderType: this.atomRefs.get(IAtomType.HtmlDiv),
        }),
        store: this.addStore({
          name: Store.createName({ name }),
          page: { id },
        }),
      })
    }

    addPrimitiveType(dto: Partial<IPrimitiveTypeDto>) {
      return primitiveTypeFactory(this.rootStore.typeService.typeDomainService)(
        dto,
      )
    }

    addProp(dto: Partial<IPropDto>) {
      return propFactory(dto)
    }

    addReactNode(dto: Partial<IReactNodeType>) {
      return reactNodeTypeFactory(this.rootStore.typeService.typeDomainService)(
        dto,
      )
    }

    addRenderProps(dto: Partial<IRenderPropTypeDto>) {
      return renderPropsTypeFactory(
        this.rootStore.typeService.typeDomainService,
      )(dto)
    }

    addRenderer(dto: Partial<IRendererDto>) {
      // console.log('addRenderer', dto)

      const renderer = rendererFactory(this.rootStore.rendererService)(dto)

      this.rootStore.rendererService.setActiveRenderer(rendererRef(renderer.id))

      return renderer
    }

    addResource(dto: Partial<IStoreDto>) {
      return resourceFactory(
        this.rootStore.resourceService.resourceDomainService,
      )(dto)
    }

    addStore(dto: Partial<IStoreDto>) {
      return storeFactory(this.rootStore.storeService.storeDomainService)({
        ...dto,
        api: dto.api ?? this.addInterfaceType({}),
      })
    }

    clear() {
      this.rootStore.clear()
    }

    getDivAtom() {
      return this.rootStore.atomService.atomDomainService.atomsList.find(
        (atom) => atom.type === IAtomType.HtmlDiv,
      )
    }

    getStringType() {
      return this.rootStore.typeService.typeDomainService.typesList.find(
        (type) =>
          type.kind === ITypeKind.PrimitiveType &&
          type.primitiveKind === IPrimitiveTypeKind.String,
      )
    }

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
          renderType: this.atomRefs.get(IAtomType.HtmlDiv),
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

      console.log(page.rootElement.current.toJson)

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

    protected onAttachedToRootStore() {
      this.clear()

      const reactFragment = this.addAtom({
        name: IAtomType.ReactFragment,
        type: IAtomType.ReactFragment,
      })

      this.atomRefs.set(reactFragment.name, reactFragment)

      const htmlDivAtom = this.addAtom({
        name: IAtomType.HtmlDiv,
        type: IAtomType.HtmlDiv,
      })

      this.atomRefs.set(htmlDivAtom.name, htmlDivAtom)
    }
  }

  const testApplication = new TestApplication({
    rootStore,
  })

  registerRootStore(testApplication)

  return testApplication
}

export const createTestApplicationForRenderer = () => {
  const rootStoreDto = {
    context: {
      actionDomainServiceContext,
      appDomainServiceContext,
      atomDomainServiceContext,
      componentDomainServiceContext,
      componentServiceContext,
      elementDomainServiceContext,
      elementServiceContext,
      fieldDomainServiceContext,
      pageDomainServiceContext,
      propServiceContext,
      rendererServiceContext,
      resourceDomainServiceContext,
      routerServiceContext,
      runtimeComponentServiceContext,
      runtimeElementServiceContext,
      runtimePageServiceContext,
      storeDomainServiceContext,
      typeDomainServiceContext,
      userDomainServiceContext,
    },
    store: {
      actionService: new ActionService({}),
      appService: new AppService({}),
      atomService: new AtomService({}),
      componentService: new ComponentApplicationService({}),
      elementService: new ElementService({}),
      fieldService: new FieldService({}),
      pageService: new PageApplicationService({}),
      propService: new PropService({}),
      rendererService: new RendererApplicationService({}),
      resourceService: new ResourceService({}),
      routerService: new RouterService({}),
      runtimeComponentService: new RuntimeComponentService({}),
      runtimeElementService: new RuntimeElementService({}),
      runtimePageService: new RuntimePageService({}),
      storeService: new StoreService({}),
      typeService: new TypeService({}),
      userService: UserService.init({
        email: '',
        email_verified: false,
        family_name: '',
        given_name: '',
        'https://api.codelab.app/jwt/claims': {
          neo4j_user_id: v4(),
          roles: [],
        },
        locale: '',
        name: '',
        nickname: '',
        picture: '',
        sid: '',
        sub: '',
        updated_at: '',
      }),
    },
  }

  return createTestApplication(rootStoreDto)
}
