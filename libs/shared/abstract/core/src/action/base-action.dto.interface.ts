import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/ref.interface'
import { IActionKind } from './action-kind.enum'

export const IBaseActionDto = Type.Object({
  __typename: Type.Optional(
    Type.Union([
      Type.Literal(`${IActionKind.ApiAction}`),
      Type.Literal(`${IActionKind.CodeAction}`),
    ]),
  ),
  id: Type.String(),
  name: Type.String(),
  store: IRef,
})

export type IBaseActionDto = Static<typeof IBaseActionDto>
