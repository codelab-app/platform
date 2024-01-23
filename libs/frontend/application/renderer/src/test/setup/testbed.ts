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
import { storeFactory } from '@codelab/frontend/domain/store'
import {
  fieldFactory,
  interfaceTypeFactory,
  primitiveTypeFactory,
  reactNodeTypeFactory,
  renderPropsTypeFactory,
} from '@codelab/frontend/domain/type'
import type {
  IApiActionDTO,
  IAppDTO,
  IAtomDTO,
  ICodeActionDTO,
  IComponentDTO,
  IElementDTO,
  IFieldDTO,
  IInterfaceTypeDTO,
  IPageDTO,
  IPrimitiveTypeDTO,
  IPropDTO,
  IReactNodeType,
  IRenderPropTypeDTO,
  IStoreDTO,
} from '@codelab/shared/abstract/core'
import {
  IAtomType,
  IElementRenderTypeKind,
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
  storeService,
  typeService,
} = rootApplicationStore

export class TestBed {
  constructor() {
    this.addAtom({ type: IAtomType.ReactFragment })
  }

  addCodeAction(dto: Partial<ICodeActionDTO>) {
    return codeActionFactory(actionService.actionDomainService)(dto)
  }

  addApiAction(dto: Partial<IApiActionDTO>) {
    return apiActionFactory(actionService.actionDomainService)(dto)
  }

  addApp(dto: Partial<IAppDTO>) {
    return appFactory(appService.appDomainService)(dto)
  }

  addAtom(dto: Partial<IAtomDTO>) {
    return atomFactory(atomService.atomDomainService)({
      ...dto,
      api: dto.api ?? this.addInterfaceType({}),
    })
  }

  addComponent(dto: Partial<IComponentDTO>) {
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

  addField(dto: Partial<IFieldDTO>) {
    return fieldFactory(fieldService.fieldDomainService)(dto)
  }

  addElement(dto: Partial<IElementDTO>) {
    return elementFactory(elementService.elementDomainService)(dto)
  }

  addPage(dto: Partial<IPageDTO>) {
    return pageFactory(pageService.pageDomainService)(dto)
  }

  addProp(dto: Partial<IPropDTO>) {
    return propFactory(dto)
  }

  addStore(dto: Partial<IStoreDTO>) {
    return storeFactory(storeService.storeDomainService)({
      ...dto,
      api: dto.api ?? this.addInterfaceType({}),
    })
  }

  addInterfaceType(dto: Partial<IInterfaceTypeDTO>) {
    return interfaceTypeFactory(typeService.typeDomainService)(dto)
  }

  addPrimitiveType(dto: Partial<IPrimitiveTypeDTO>) {
    return primitiveTypeFactory(typeService.typeDomainService)(dto)
  }

  addReactNode(dto: Partial<IReactNodeType>) {
    return reactNodeTypeFactory(typeService.typeDomainService)(dto)
  }

  addRenderProps(dto: Partial<IRenderPropTypeDTO>) {
    return renderPropsTypeFactory(typeService.typeDomainService)(dto)
  }

  addRenderer(dto: Partial<IRendererDto>) {
    const renderer = rendererFactory(rendererService)(dto)

    rendererService.setActiveRenderer(rendererRef(renderer.id))

    return renderer
  }
}
