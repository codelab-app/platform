import { ITypeKind } from '@codelab/shared/abstract/core'
import { z } from 'zod'
import { FieldExportSchema, FieldSchema } from '../field.interface'
import { BaseTypeSchema } from './type.interface'

/**
 * Entity
 */
export const InterfaceTypeSchema = BaseTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.InterfaceType}`).optional(),
  fields: z.array(FieldSchema),
})

export type IInterfaceType = z.infer<typeof InterfaceTypeSchema>

/**
 * Export
 */
const InterfaceTypeExportSchema = InterfaceTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.InterfaceType}`),
  fields: z.array(FieldExportSchema),
})

export type IInterfaceTypeExport = z.infer<typeof InterfaceTypeExportSchema>

/**
 * Create
 */
const CreateInterfaceTypeSchema = InterfaceTypeSchema.pick({
  __typename: true,
  owner: true,
  name: true,
  fields: true,
})

export type ICreateInterfaceType = z.infer<typeof CreateInterfaceTypeSchema>
