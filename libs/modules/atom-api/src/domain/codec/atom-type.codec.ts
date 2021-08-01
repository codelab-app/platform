import { fromEnum } from '@codelab/backend'
import * as t from 'io-ts'
import { AtomTypeEnum } from '../../infrastructure/atom-type.model'

export const AtomTypeC = fromEnum<AtomTypeEnum>('AtomType', AtomTypeEnum)

export type AtomTypeC = t.TypeOf<typeof AtomTypeC>

export const AtomTypeFieldC = t.type({
  type: AtomTypeC,
})
