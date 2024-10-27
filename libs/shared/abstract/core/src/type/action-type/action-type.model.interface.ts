import type { Static } from '@sinclair/typebox'

import { ActionTypeDtoSchema } from './action-type.dto.interface'

export const ActionTypeSchema = ActionTypeDtoSchema

export type IActionType = Static<typeof ActionTypeSchema>
