import { AtomType } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import React from 'react'

export type AtomFactoryResult = React.ComponentType<any> | Nullable<string>
export type AtomsRecord = Partial<Record<AtomType, AtomFactoryResult>>
export type AtomFactory = (atomType: AtomType) => AtomFactoryResult
