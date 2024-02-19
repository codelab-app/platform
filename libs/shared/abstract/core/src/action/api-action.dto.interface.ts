import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/node-type.interface'
import { IPropDto } from '../prop/prop.dto.interface'
import { IActionRef } from './action-entity.dto.interface'
import { IActionKind } from './action-kind.enum'
import { IBaseActionDTO } from './base-action.dto.interface'

export const IApiActionDto = Type.Composite([
  IBaseActionDto,
  Type.Object({
    __typename: Type.Literal(`${IActionKind.ApiAction}`),
    config: IPropDto,
    errorAction: Typebox.Nullish(IActionRef),
    resource: IRef,
    successAction: Typebox.Nullish(IActionRef),
  }),
])

export type IApiActionDto = Static<typeof IApiActionDto>

export const IApiAction = IApiActionDto

export type IApiAction = Static<typeof IApiAction>
