import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IActionKind } from '../action-kind.enum'
import { IBaseActionDTO } from './base-action.dto.interface'

export const ICodeActionDTO = Type.Composite([
  IBaseActionDTO,
  Type.Object({
    __typename: Type.Literal(`${IActionKind.CodeAction}`),
    code: Type.String(),
  }),
])

export type ICodeActionDTO = Static<typeof ICodeActionDTO>

export const ICodeAction = ICodeActionDTO

export type ICodeAction = Static<typeof ICodeAction>
