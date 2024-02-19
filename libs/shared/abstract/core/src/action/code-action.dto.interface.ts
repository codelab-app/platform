import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IActionKind } from './action-kind.enum'
import { IBaseActionDTO } from './base-action.dto.interface'

export const ICodeActionDto = Type.Composite([
  IBaseActionDto,
  Type.Object({
    __typename: Type.Literal(`${IActionKind.CodeAction}`),
    code: Type.String(),
  }),
])

export type ICodeActionDto = Static<typeof ICodeActionDto>

export const ICodeAction = ICodeActionDto

export type ICodeAction = Static<typeof ICodeAction>
