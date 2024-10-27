import { Typebox } from '@codelab/shared/abstract/typebox'
import { type Static, Type } from '@sinclair/typebox'

import { FieldSchema } from '../../field'
import { InterfaceTypeDtoSchema } from './interface-type.dto.interface'

export const InterfaceTypeSchema = Typebox.Overwrite(
  InterfaceTypeDtoSchema,
  Type.Object({
    fields: Type.Array(FieldSchema),
  }),
)
export type IInterfaceType = Static<typeof InterfaceTypeSchema>
