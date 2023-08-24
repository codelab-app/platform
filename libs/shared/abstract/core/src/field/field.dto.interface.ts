import { IEntity, Typebox } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const IFieldDTO = Type.Object({
  api: IEntity,
  defaultValues: Typebox.Nullish(Type.String()),
  description: Typebox.Nullish(Type.String()),
  fieldType: IEntity,
  id: Type.String(),
  key: Type.String(),
  name: Typebox.Nullish(Type.String()),
  nextSibling: Typebox.Nullish(IEntity),
  prevSibling: Typebox.Nullish(IEntity),
  validationRules: Typebox.Nullish(Type.String()),
})

export type IFieldDTO = Static<typeof IFieldDTO>

const Demo = Type.Object({
  name: Type.Optional(Type.String()),
})

type Demo = Static<typeof Demo>
