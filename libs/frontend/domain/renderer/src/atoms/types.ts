import type { IPropData } from '@codelab/frontend/abstract/core'
import type { IAtomType } from '@codelab/shared/abstract/core'
import type { IEntity, Nullable } from '@codelab/shared/abstract/types'
import type React from 'react'

/**
 * This is our representation of what kind of ReactComponent to use
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IComponentType = React.ComponentType<any> | Nullable<string>

export type AtomsRecord = Partial<Record<IAtomType, IComponentType>>

export interface AtomFactoryInput {
  atomType: IAtomType
  node: IEntity
  props: IPropData
}

export type AtomFactoryResult = [IComponentType, IPropData]

/**
 * Allows us to transform the props, as well as the component (useful for destructuring component name such as Antd Icon)
 */
export type AtomCustomizerFn = (
  input: AtomFactoryInput & { props: IPropData },
) => {
  props?: IPropData
}

export type AtomCustomizer = Partial<Record<IAtomType, AtomCustomizerFn>>
