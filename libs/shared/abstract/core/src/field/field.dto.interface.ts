import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/node-type.interface'

export const IFieldDto = Type.Object({
  api: IRef,
  defaultValues: Typebox.Nullish(Type.Any()),
  description: Typebox.Nullish(Type.String()),
  fieldType: IRef,
  id: Type.String(),
  key: Type.String(),
  name: Typebox.Nullish(Type.String()),
  nextSibling: Typebox.Nullish(IRef),
  prevSibling: Typebox.Nullish(IRef),
  validationRules: Typebox.Nullish(Type.Any()),
})

export type IFieldDto = Static<typeof IFieldDto>

export const IField = IFieldDto

export type IField = Static<typeof IField>

export type IFieldRef = string
