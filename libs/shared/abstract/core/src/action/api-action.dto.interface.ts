import { Typebox } from '@codelab/shared/abstract/typebox'
import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IActionKind } from '../action-kind.enum'
import { IPropDTO } from '../prop.dto.interface'
import { IActionEntity } from './action-entity.dto.interface'
import { IBaseActionDTO } from './base-action.dto.interface'

export const IApiActionDTO = Type.Composite([
  IBaseActionDTO,
  Type.Object({
    __typename: Type.Optional(Type.Literal(`${IActionKind.ApiAction}`)),
    config: IPropDTO,
    errorAction: Typebox.Nullish(IActionEntity),
    resource: IEntity,
    successAction: Typebox.Nullish(IActionEntity),
  }),
])

export type IApiActionDTO = Static<typeof IApiActionDTO>

export const IApiAction = Typebox.RequireTypename(IApiActionDTO)

export type IApiAction = Static<typeof IApiAction>
