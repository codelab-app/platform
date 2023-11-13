import type { IRendererDto } from '@codelab/frontend/abstract/application'
import { rendererRef } from '@codelab/frontend/abstract/application'
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
} from '@codelab/frontend/domain/type'
import type {
  IAtomDTO,
  IComponentDTO,
  IInterfaceTypeDTO,
  IStoreDTO,
} from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { rendererFactory } from '../renderer.test.factory'
import { rootApplicationStore } from './root.test.store'

const {
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

  addApp = appFactory(appService.appDomainService)

  addAtom = (dto: Partial<IAtomDTO>) =>
    atomFactory(atomService.atomDomainService)({
      ...dto,
      api: dto.api ?? this.addInterfaceType({}),
    })

  addComponent = (dto: Partial<IComponentDTO>) =>
    componentFactory(componentService.componentDomainService)({
      ...dto,
      api: dto.api ?? this.addInterfaceType({}),
    })

  addField = fieldFactory(fieldService.fieldDomainService)

  addElement = elementFactory(elementService.elementDomainService)

  addPage = pageFactory(pageService.pageDomainService)

  addProp = propFactory

  addStore(dto: Partial<IStoreDTO>) {
    return storeFactory(storeService.storeDomainService)({
      ...dto,
      api: dto.api ?? this.addInterfaceType({}),
    })
  }

  addInterfaceType(dto: Partial<IInterfaceTypeDTO>) {
    return interfaceTypeFactory(typeService.typeDomainService)(dto)
  }

  render(dto: Partial<IRendererDto>) {
    const renderer = rendererFactory(rendererService)(dto)

    rendererService.setActiveRenderer(rendererRef(renderer.id))
    renderer.render()

    return renderer
  }
}
