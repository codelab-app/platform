import type {
  IAppDTO,
  IAtomDTO,
  IComponentDTO,
  IElementDTO,
  IFieldDTO,
  IInterfaceTypeDTO,
  IPageDTO,
  IPrimitiveTypeDTO,
  IPropDTO,
  IReactNodeTypeDTO,
  IRenderPropTypeDTO,
  IStoreDTO,
} from '@codelab/shared/abstract/core'
import type { Factory } from 'fishery'
import type { IAppModel } from '../../app'
import type { IAtomModel } from '../../atom'
import type { IComponentModel } from '../../component'
import type { IElementModel } from '../../element'
import type { IPageModel } from '../../page'
import type { IPropModel } from '../../prop'
import type { IRendererDto, IRendererModel } from '../../renderer'
import type { IStoreModel } from '../../store'
import type {
  IFieldModel,
  IPrimitiveTypeModel,
  IReactNodeTypeModel,
  IRenderPropTypeModel,
} from '../../type'
import type { IRootDomainStore } from './root.domain.store.interface'

export interface DomainMap {
  app: [IAppModel, IAppDTO]
  atom: [IAtomModel, IAtomDTO]
  component: [IComponentModel, IComponentDTO]
  element: [IElementModel, IElementDTO]
  field: [IFieldModel, IFieldDTO]
  interfaceType: [IInterfaceTypeDTO]
  page: [IPageModel, IPageDTO]
  primitiveType: [IPrimitiveTypeModel, IPrimitiveTypeDTO]
  props: [IPropModel, IPropDTO]
  reactNodeType: [IReactNodeTypeModel, IReactNodeTypeDTO]
  renderPropType: [IRenderPropTypeModel, IRenderPropTypeDTO]
  renderer: [IRendererModel, IRendererDto]
  store: [IStoreModel, IStoreDTO]
}

export type IFactoryDomain = {
  [K in keyof DomainMap]: Factory<DomainMap[K][0], DomainMap[K][1]>
}

/**
 * Injects root store, allow us to hydrate data within it
 */
export type IFactoryDomainCallback = (
  rootStore: Partial<IRootDomainStore>,
) => Partial<IFactoryDomain>
