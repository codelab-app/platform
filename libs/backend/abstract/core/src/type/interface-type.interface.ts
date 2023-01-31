import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { z } from 'zod'
import { FieldExportSchema, FieldSchema } from '../field.interface'
import { BaseTypeSchema } from './type.interface'

export const InterfaceTypeSchema = BaseTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.InterfaceType}`).optional(),
  // kind: z.literal(ITypeKind.InterfaceType),
  fields: z.array(FieldSchema),
})

export type IInterfaceType = z.infer<typeof InterfaceTypeSchema>

const InterfaceTypeExportSchema = InterfaceTypeSchema.extend({
  __typename: z.literal(ITypeKind.InterfaceType),
  fields: z.array(FieldExportSchema),
})

export type IInterfaceTypeExport = z.infer<typeof InterfaceTypeExportSchema>
