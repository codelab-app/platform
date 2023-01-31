import { EntitySchema } from '@codelab/shared/abstract/types'
import { z } from 'zod'

/**
 * Data output of parser service
 */
export interface AntDesignFieldsByFile {
  [file: string]: Array<AntDesignField>
}

/**
 * The data format of the CSV row itself
 */
export interface AntDesignField {
  property: string
  description: string
  /**
   * The type is the most important, we parse this into our type schema
   */
  type: string
  default: string
  version: string
  isEnum: boolean
}

export const FieldSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  // validationRules: ,
  fieldType: EntitySchema,
  api: EntitySchema,
  defaultValues: z.string().optional().nullable(),
})

export type IField = z.infer<typeof FieldSchema>

export const FieldExportSchema = FieldSchema.extend({
  fieldType: z.object({
    id: z.string(),
    name: z.string(),
  }),
  api: EntitySchema,
})

export type IFieldExport = z.infer<typeof FieldExportSchema>
