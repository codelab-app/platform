import { AtomType } from '@codelab/shared/abstract/core'
import React from 'react'

export type AtomFactoryResult = React.ComponentType<any> | string | null
export type AtomsRecord = Partial<Record<AtomType, AtomFactoryResult>>
export type AtomFactory = (atomType: AtomType) => AtomFactoryResult
