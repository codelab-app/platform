import { EntityFieldC } from '@codelab/backend'
import * as t from 'io-ts'
import { AtomLabelFieldC } from './atom-label.codec'
import { AtomTypeFieldC } from './atom-type.codec'

/**
 * Make Atom the aggregate
 */
export const AtomC = t.intersection([
  EntityFieldC,
  AtomTypeFieldC,
  AtomLabelFieldC,
])

export type AtomC = t.TypeOf<typeof AtomC>
