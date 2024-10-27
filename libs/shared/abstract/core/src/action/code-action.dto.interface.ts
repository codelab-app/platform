import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { IActionKind } from './action-kind.enum'
import { BaseActionDtoSchema } from './base-action.dto.interface'

export const CodeActionDtoSchema = Type.Composite([
  BaseActionDtoSchema,
  Type.Object({
    __typename: Type.Literal(`${IActionKind.CodeAction}`),
    code: Type.String(),
    // type: Type.Literal(IActionKind.CodeAction),
  }),
])

export type ICodeActionDto = Static<typeof CodeActionDtoSchema>

export const CodeActionSchema = CodeActionDtoSchema

export type ICodeAction = Static<typeof CodeActionSchema>
