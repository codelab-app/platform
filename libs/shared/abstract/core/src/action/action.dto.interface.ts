import { type Static, Type } from '@sinclair/typebox'

import { ApiActionDtoSchema, ApiActionSchema } from './api-action.dto.interface'
import {
  CodeActionDtoSchema,
  CodeActionSchema,
} from './code-action.dto.interface'

export const ActionDtoSchema = Type.Union(
  [ApiActionDtoSchema, CodeActionDtoSchema],
  {
    discriminantKey: '__typename',
    errorMessage: 'Unknown action type name',
  },
)

export type IActionDto = Static<typeof ActionDtoSchema>

export const ActionSchema = Type.Union([ApiActionSchema, CodeActionSchema], {
  discriminantKey: '__typename',
  errorMessage: 'Unknown action type name',
})

export type IAction = Static<typeof ActionSchema>
