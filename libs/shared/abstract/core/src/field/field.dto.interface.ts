import { IEntity } from '@codelab/shared/abstract/types'
import { Typebox } from '@codelab/shared/infra/validation'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IInterfaceTypeEntity, ITypeEntity } from '../type'

export const IFieldDTO = Type.Object({
  api: IInterfaceTypeEntity,
  defaultValues: Typebox.Nullish(Type.String()),
  description: Typebox.Nullish(Type.String()),
  fieldType: ITypeEntity,
  id: Type.String(),
  key: Type.String(),
  name: Typebox.Nullish(Type.String()),
  nextSibling: Typebox.Nullish(IEntity),
  prevSibling: Typebox.Nullish(IEntity),
  validationRules: Typebox.Nullish(Type.String()),
})

export type IFieldDTO = Static<typeof IFieldDTO>
