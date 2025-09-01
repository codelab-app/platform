import type { SelectOption } from '@codelab/frontend-abstract-types'
import type { Static } from '@sinclair/typebox'
import type { JSONSchemaType } from 'ajv'

import { AtomDtoSchema } from '@codelab/shared-abstract-core'
import { Type } from '@sinclair/typebox'

export const UpdateAtomDataSchema = Type.Pick(AtomDtoSchema, [
  'externalCssSource',
  'externalJsSource',
  'externalSourceType',
  'id',
  'api',
  'name',
  'requiredParents',
  'suggestedChildren',
  'tags',
  'type',
])
export type IUpdateAtomData = Static<typeof UpdateAtomDataSchema>

export const CreateAtomDataSchema = Type.Omit(UpdateAtomDataSchema, ['api'])

export type SchemaBuilder<BuilderInput, Data> = (
  data: BuilderInput,
) => JSONSchemaType<Data>

export type ICreateAtomSchemaBuilder = SchemaBuilder<
  { tags: Array<SelectOption>; atoms: Array<SelectOption> },
  ICreateAtomData
>

export type IUpdateAtomSchemaBuilder = SchemaBuilder<
  { tags: Array<SelectOption>; atoms: Array<SelectOption> },
  IUpdateAtomData
>

export type ICreateAtomData = Static<typeof CreateAtomDataSchema>
