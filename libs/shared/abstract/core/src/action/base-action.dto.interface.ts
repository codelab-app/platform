import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

import { IActionKind } from './action-kind.enum'

export const BaseActionDtoSchema = Type.Object({
  __typename: Type.Optional(
    Type.Union([
      Type.Literal(`${IActionKind.ApiAction}`),
      Type.Literal(`${IActionKind.CodeAction}`),
    ]),
  ),
  id: Type.String(),
  kind: Type.Enum(IActionKind),
  name: Type.String(),
  store: Typebox.Ref,
})

export type IBaseActionDto = Static<typeof BaseActionDtoSchema>
