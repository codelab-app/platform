import type { IAtomType } from '@codelab/shared/abstract/core'
import type { IComponentType } from '../../renderer'

/**
 * Gives us a record of atom and its respective component type for rendering
 */
export type IAtomRendererRecord = Partial<Record<IAtomType, IComponentType>>
