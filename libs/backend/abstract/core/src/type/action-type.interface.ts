import { ITypeKind } from '@codelab/shared/abstract/core'
import { z } from 'zod'
import { BaseTypeSchema } from './type.interface'

/**
 * Entity
 */
const ActionTypeSchema = BaseTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.ActionType}`).optional(),
})

export type IActionType = z.infer<typeof ActionTypeSchema>

/**
 * Export
 */
const ActionTypeExportSchema = ActionTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.ActionType}`),
})

export type IActionTypeExport = z.infer<typeof ActionTypeExportSchema>

/**
 * Create
 */
const CreateActionTypeSchema = ActionTypeSchema.pick({
  __typename: true,
  owner: true,
})

export type ICreateActionType = z.infer<typeof CreateActionTypeSchema>
