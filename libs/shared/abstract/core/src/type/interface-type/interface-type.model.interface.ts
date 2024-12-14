import { type Static, Type } from '@sinclair/typebox'

import { FieldSchema } from '../../field'
import { InterfaceTypeDtoSchema } from './interface-type.dto.interface'

export const InterfaceTypeSchema = Type.Object({
  ...InterfaceTypeDtoSchema.properties,
  fields: Type.Array(FieldSchema),
})

export type IInterfaceType = Static<typeof InterfaceTypeSchema>
