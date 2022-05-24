import { IAtomType, IPropData } from '@codelab/shared/abstract/core'
import { IEntity, Nullable } from '@codelab/shared/abstract/types'
import React from 'react'

/**
 * This is our representation of what kind of ReactComponent to use
 */
type IComponentType = React.ComponentType<any> | Nullable<string>

export type AtomsRecord = Partial<Record<IAtomType, IComponentType>>

export type AtomFactoryInput = {
  atomType: IAtomType
  node: IEntity
}

export type AtomFactoryResult = [IComponentType, IPropData]

/**
 * Allows us to transform the props, as well as the component (useful for destructuring component name such as Antd Icon)
 */
export type AtomCustomizerFn = (
  input: AtomFactoryInput & { props: IPropData },
) => {
  props?: IPropData
  component?: IComponentType
}

export type AtomCustomizer = Partial<Record<IAtomType, AtomCustomizerFn>>
