/**
 * This is not a schema concept, but rather a higher level concept that contains all the data required to represent an API.
 *
 * Interface types is the top level entry to types, and Store/Component all contain them.
 *
 * Interface types contain fields, which could then be nested interface type and so forth.
 *
 * This recursive relationship makes it difficult to represent, so we FLATTEN them into this concept
 *
 * They are ordered from the leaf to the root, since that is the dependent order
 */

import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { TypeDtoSchema } from '../type.dto.interface'
import { TypeExportSchema } from '../type.io.interface'
import { InterfaceTypeSchema } from './interface-type.model.interface'

export const ApiExportSchema = Type.Composite([
  Type.Object({
    types: Type.Array(TypeExportSchema),
  }),
  Type.Omit(InterfaceTypeSchema, ['owner']),
])

export type IApiExport = Static<typeof ApiExportSchema>

export const ApiImportSchema = Type.Object({
  ...InterfaceTypeSchema.properties,
  types: Type.Array(TypeDtoSchema),
})

export type IApiImport = Static<typeof ApiImportSchema>
