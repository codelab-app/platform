import { AtomType, IPropData } from '@codelab/shared/abstract/core'
import { IIdentifiable, Nullable } from '@codelab/shared/abstract/types'
import React from 'react'

export type AtomsRecord = Partial<
  Record<AtomType, React.ComponentType<any> | Nullable<string>>
>

export type AtomFactoryInput = {
  atomType: AtomType
  node: IIdentifiable
}

export type AtomFactoryResult = [
  Nullable<React.ComponentType<any> | string>,
  IPropData,
]

export type PropsCustomizerFn = (
  input: AtomFactoryInput & { props: IPropData },
) => any

export type AtomPropsCustomizer = Partial<Record<AtomType, PropsCustomizerFn>>
