/* eslint-disable @typescript-eslint/member-ordering */
import type {
  IRendererDto,
  IRootStore,
} from '@codelab/frontend/abstract/application'
import {
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type { IAppModel, IPageModel } from '@codelab/frontend/abstract/domain'
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
import type {
  IApiActionDto,
  IAppDto,
  IAtomDto,
  IAtomRenderType,
  ICodeActionDto,
  IComponentDto,
  ICreateElementDto,
  IDiscriminatedRef,
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
  IElementRenderTypeKind,
  IPageKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { PartialExcept } from '@codelab/shared/abstract/types'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { throwIfUndefined } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { rendererFactory } from '../setup/renderer.test.factory'
import { rootApplicationStore } from './root.test.store'

export class TestBed {
  static Create() {
    const testBed = new TestBed()

    /**
     * Create default data
     */
    testBed.clear()

    return testBed
  }

  private constructor() {
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

  addApiAction(dto: Partial<IApiActionDto>) {
    return apiActionFactory(this.rootStore.actionService.actionDomainService)(
      dto,
    )
  }

  addApp(dto: Partial<IAppDto>) {
    return appFactory(this.rootStore.appService.appDomainService)(dto)
  }

  addAtom(dto: Partial<IAtomDto>) {
    return atomFactory(this.rootStore.atomService.atomDomainService)({
      ...dto,
      api: dto.api ?? this.addInterfaceType({}),
    })
  }

  addCodeAction(dto: Partial<ICodeActionDto>) {
    return codeActionFactory(this.rootStore.actionService.actionDomainService)(
      dto,
    )
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
        renderType: {
          __typename: IElementRenderTypeKind.Atom,
          id: this.addAtom({ type: IAtomType.ReactFragment }).id,
        },
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
    return pageFactory(this.rootStore.pageService.pageDomainService)(dto)
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
    return renderPropsTypeFactory(this.rootStore.typeService.typeDomainService)(
      dto,
    )
  }

  setupRenderer(dto: Partial<IRendererDto>) {
    this.addRenderer(dto)

    return this
  }

  addRenderer(dto: Partial<IRendererDto>) {
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

  private atomRefs: Map<string, IAtomRenderType> = new Map()

  private rootStore: IRootStore = rootApplicationStore
}
