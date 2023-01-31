import { ITypeKind } from '@codelab/shared/abstract/core'
import { z } from 'zod'
import { BaseTypeSchema } from './type.interface'

const ActionTypeSchema = BaseTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.ActionType}`).optional(),
  // kind: z.literal(ITypeKind.ActionType),
})

export type IActionType = z.infer<typeof ActionTypeSchema>

const ActionTypeExportSchema = ActionTypeSchema.extend({
  __typename: z.literal(`${ITypeKind.ActionType}`),
})

export type IActionTypeExport = z.infer<typeof ActionTypeExportSchema>
