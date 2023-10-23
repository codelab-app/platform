import type { IRendererDto } from '@codelab/frontend/abstract/domain'
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
import type { IRootStore } from './root.application.store'

/**
 * Injects root store, allow us to hydrate data within it
 */
export type IDtoFactoryCallback = (
  rootStore: Partial<IRootStore>,
) => IDtoFactory

/**
 * Inference causes weird issues, so we create a type here
 */
export interface IDtoFactory {
  app: Factory<IAppDTO>
  atom: Factory<IAtomDTO>
  component: Factory<IComponentDTO>
  element: Factory<IElementDTO>
  field: Factory<IFieldDTO>
  interfaceType: Factory<IInterfaceTypeDTO>
  page: Factory<IPageDTO>
  primitiveType: Factory<IPrimitiveTypeDTO>
  props: Factory<IPropDTO>
  reactNodeType: Factory<IReactNodeTypeDTO>
  renderPropType: Factory<IRenderPropTypeDTO>
  renderer: Factory<IRendererDto>
  store: Factory<IStoreDTO>
}

export type IDtoFactoryType = keyof IDtoFactory
