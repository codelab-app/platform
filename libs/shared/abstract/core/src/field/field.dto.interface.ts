import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

export const FieldDtoSchema = Type.Object({
  api: Typebox.Ref,
  defaultValues: Typebox.Nullish(Type.Any()),
  description: Typebox.Nullish(Type.String()),
  fieldType: Typebox.Ref,
  id: Type.String(),
  key: Type.String(),
  name: Typebox.Nullish(Type.String()),
  nextSibling: Typebox.Nullish(Typebox.Ref),
  prevSibling: Typebox.Nullish(Typebox.Ref),
  validationRules: Typebox.Nullish(Type.Any()),
})

export type IFieldDto = Static<typeof FieldDtoSchema>

export const FieldSchema = FieldDtoSchema

export type IField = Static<typeof FieldSchema>

export type IFieldRef = string
