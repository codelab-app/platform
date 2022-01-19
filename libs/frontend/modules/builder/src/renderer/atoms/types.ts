import { AtomType, PropsData } from '@codelab/shared/abstract/core'
import { EntityLike, Nullable } from '@codelab/shared/abstract/types'
import React from 'react'

export type AtomsRecord = Partial<
  Record<AtomType, React.ComponentType<any> | Nullable<string>>
>

export type AtomFactoryInput = {
  atomType: AtomType
  node: EntityLike
}

export type AtomFactoryResult = [
  Nullable<React.ComponentType<any> | string>,
  PropsData,
]

export type PropsCustomizerFn = (
  input: AtomFactoryInput & { props: PropsData },
) => any

export type AtomPropsCustomizer = Partial<Record<AtomType, PropsCustomizerFn>>
