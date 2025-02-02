import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

import { PropDtoSchema } from '../prop/prop.dto.interface'
import { ActionRefSchema } from './action-entity.dto.interface'
import { IActionKind } from './action-kind.enum'
import { BaseActionDtoSchema } from './base-action.dto.interface'

export const ApiActionDtoSchema = Type.Composite([
  BaseActionDtoSchema,
  Type.Object({
    __typename: Type.Literal(`${IActionKind.ApiAction}`),
    config: PropDtoSchema,
    errorAction: Typebox.Nullish(ActionRefSchema),
    resource: Typebox.RefSchema,
    successAction: Typebox.Nullish(ActionRefSchema),
  }),
])

export type IApiActionDto = Static<typeof ApiActionDtoSchema>

export const ApiActionSchema = ApiActionDtoSchema

export type IApiAction = Static<typeof ApiActionSchema>
