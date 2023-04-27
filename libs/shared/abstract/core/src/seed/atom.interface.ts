// import type { IComponentType } from '@codelab/frontend/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { IAtomType } from '../atom-type.enum'

// TODO: Can't import due to circular dep, so we copy it here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IComponentType = Nullable<string> | React.ComponentType<any>

export type AtomsRecord = Partial<Record<IAtomType, IComponentType>>
