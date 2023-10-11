import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IAtom } from './atom.dto.interface'
import { IApi } from '../type'

/**
 * Aggregate is used to group data together, not 1-to-1 mapping to models
 */
export const IAtomBoundedContext = Type.Object({
  api: IApi,
  atom: IAtom,
})

export type IAtomBoundedContext = Static<typeof IAtomBoundedContext>
