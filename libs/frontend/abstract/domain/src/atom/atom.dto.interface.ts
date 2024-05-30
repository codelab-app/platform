import { AtomDtoSchema, IAtomDto } from '@codelab/shared/abstract/core'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const CreateAtomDataSchema = Type.Pick(AtomDtoSchema, [
  'externalCssSource',
  'externalJsSource',
  'externalSourceType',
  'id',
  'name',
  'requiredParents',
  'suggestedChildren',
  'tags',
  'type',
])

export type ICreateAtomData = Static<typeof CreateAtomDataSchema>

export type IUpdateAtomData = ICreateAtomData
