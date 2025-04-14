import { type Static, Type } from '@sinclair/typebox'

import { FieldDtoSchema } from '../../field'
import { InterfaceTypeDtoSchema } from './interface-type.dto.interface'

export const InterfaceTypeSchema = Type.Composite([
  Type.Omit(InterfaceTypeDtoSchema, ['fields']),
  Type.Object({
    fields: Type.Array(FieldDtoSchema),
  }),
])

export type IInterfaceType = Static<typeof InterfaceTypeSchema>
