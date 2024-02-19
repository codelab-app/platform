import { IAtomDto } from '@codelab/shared/abstract/core'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const ICreateAtomData = Type.Pick(IAtomDto, [
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

export type ICreateAtomData = Static<typeof ICreateAtomData>

export type IUpdateAtomData = ICreateAtomData
