import { Typebox } from '@codelab/shared/abstract/typebox'
import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IInterfaceTypeRef, ITypeMaybeRef } from '../type'

export const IFieldDTO = Type.Object({
  api: IEntity,
  defaultValues: Typebox.Nullish(Type.Any()),
  description: Typebox.Nullish(Type.String()),
  fieldType: IEntity,
  id: Type.String(),
  key: Type.String(),
  name: Typebox.Nullish(Type.String()),
  nextSibling: Typebox.Nullish(IEntity),
  prevSibling: Typebox.Nullish(IEntity),
  validationRules: Typebox.Nullish(Type.Any()),
})

export type IFieldDTO = Static<typeof IFieldDTO>

export const IField = IFieldDTO

export type IField = Static<typeof IField>
