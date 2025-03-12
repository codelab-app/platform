import { type Static, Type } from '@sinclair/typebox'

import { FieldSchema } from '../../field'
import { InterfaceTypeDtoSchema } from './interface-type.dto.interface'

export const InterfaceTypeSchema = Type.Composite([
  InterfaceTypeDtoSchema(),
  Type.Object({
    fields: Type.Array(FieldSchema),
  }),
])

export type IInterfaceType = Static<typeof InterfaceTypeSchema>
