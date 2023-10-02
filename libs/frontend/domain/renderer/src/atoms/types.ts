import type {
  IAtomModel,
  IComponentType,
} from '@codelab/frontend/abstract/core'
import type { IAtomType, IPropData } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'

export interface AtomFactoryInput {
  atom: IAtomModel
  node: IEntity
  props: IPropData
}

export type AtomFactoryResult = [Nullish<IComponentType>, IPropData]

/**
 * Allows us to transform the props, as well as the component (useful for destructuring component name such as Antd Icon)
 */
export type AtomCustomizerFn = (
  input: AtomFactoryInput & { props: IPropData },
) => {
  props?: IPropData
}

export type AtomCustomizer = Partial<Record<IAtomType, AtomCustomizerFn>>
