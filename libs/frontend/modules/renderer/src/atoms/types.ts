import { IAtomType, IPropData } from '@codelab/shared/abstract/core'
import { IEntity, Nullable } from '@codelab/shared/abstract/types'
import React from 'react'

export type AtomsRecord = Partial<
  Record<IAtomType, React.ComponentType<any> | Nullable<string>>
>

export type AtomFactoryInput = {
  atomType: IAtomType
  node: IEntity
}

export type AtomFactoryResult = [
  Nullable<React.ComponentType<any> | string>,
  IPropData,
]

export type PropsCustomizerFn = (
  input: AtomFactoryInput & { props: IPropData },
) => any

export type AtomPropsCustomizer = Partial<Record<IAtomType, PropsCustomizerFn>>
