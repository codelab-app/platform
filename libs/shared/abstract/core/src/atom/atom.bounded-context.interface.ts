import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IApi } from '../type'
import { IAtom } from './atom.dto.interface'

/**
 * Aggregate is used to group data together, not 1-to-1 mapping to models
 */
export const IAtomBoundedContext = Type.Object({
  api: IApi,
  atom: IAtom,
})

export type IAtomBoundedContext = Static<typeof IAtomBoundedContext>
