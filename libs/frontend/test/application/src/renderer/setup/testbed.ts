import type { IRendererDto } from '@codelab/frontend/abstract/application'
import { rendererRef } from '@codelab/frontend/abstract/application'
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
import { storeFactory } from '@codelab/frontend/domain/store'
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
  IElementRenderTypeKind,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { rendererFactory } from '../setup/renderer.test.factory'
import { rootApplicationStore } from './root.test.store'

const {
  actionService,
  appService,
  atomService,
  componentService,
  elementService,
  fieldService,
  pageService,
  rendererService,
  resourceService,
  storeService,
  typeService,
} = rootApplicationStore

export class TestBed {
  constructor() {
    this.addAtom({ type: IAtomType.ReactFragment })
  }

  addApiAction(dto: Partial<IApiActionDto>) {
    return apiActionFactory(actionService.actionDomainService)(dto)
  }

  addApp(dto: Partial<IAppDto>) {
    return appFactory(appService.appDomainService)(dto)
  }

  addAtom(dto: Partial<IAtomDto>) {
    return atomFactory(atomService.atomDomainService)({
      ...dto,
      api: dto.api ?? this.addInterfaceType({}),
    })
  }

  addCodeAction(dto: Partial<ICodeActionDto>) {
    return codeActionFactory(actionService.actionDomainService)(dto)
  }

  addComponent(dto: Partial<IComponentDto>) {
    const id = dto.id ?? v4()

    return componentFactory(componentService.componentDomainService)({
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
    return elementFactory(elementService.elementDomainService)(dto)
  }

  addField(dto: Partial<IFieldDto>) {
    return fieldFactory(fieldService.fieldDomainService)(dto)
  }

  addInterfaceType(dto: Partial<IInterfaceTypeDto>) {
    return interfaceTypeFactory(typeService.typeDomainService)(dto)
  }

  addPage(dto: Partial<IPageDto>) {
    return pageFactory(pageService.pageDomainService)(dto)
  }

  addPrimitiveType(dto: Partial<IPrimitiveTypeDto>) {
    return primitiveTypeFactory(typeService.typeDomainService)(dto)
  }

  addProp(dto: Partial<IPropDto>) {
    return propFactory(dto)
  }

  addReactNode(dto: Partial<IReactNodeType>) {
    return reactNodeTypeFactory(typeService.typeDomainService)(dto)
  }

  addRenderProps(dto: Partial<IRenderPropTypeDto>) {
    return renderPropsTypeFactory(typeService.typeDomainService)(dto)
  }

  addRenderer(dto: Partial<IRendererDto>) {
    const renderer = rendererFactory(rendererService)(dto)

    rendererService.setActiveRenderer(rendererRef(renderer.id))

    return renderer
  }

  addResource(dto: Partial<IStoreDto>) {
    return resourceFactory(resourceService.resourceDomainService)({})
  }

  addStore(dto: Partial<IStoreDto>) {
    return storeFactory(storeService.storeDomainService)({
      ...dto,
      api: dto.api ?? this.addInterfaceType({}),
    })
  }

  getDivAtom() {
    return atomService.atomDomainService.atomsList.find(
      (atom) => atom.type === IAtomType.HtmlDiv,
    )
  }

  getStringType() {
    return typeService.typeDomainService.typesList.find(
      (type) =>
        type.kind === ITypeKind.PrimitiveType &&
        type.primitiveKind === IPrimitiveTypeKind.String,
    )
  }
}
