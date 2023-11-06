import type { AtomDevelopmentFragment } from '@codelab/shared/abstract/codegen'
import { IAtomDTO } from '@codelab/shared/abstract/core'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const ICreateAtomData = Type.Pick(IAtomDTO, [
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

export type IRenderAtomDTO = AtomDevelopmentFragment
