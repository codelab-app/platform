import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/node-type.interface'
import { IPropDTO } from '../prop/prop.dto.interface'
import { IActionRef } from './action-entity.dto.interface'
import { IActionKind } from './action-kind.enum'
import { IBaseActionDTO } from './base-action.dto.interface'

export const IApiActionDTO = Type.Composite([
  IBaseActionDTO,
  Type.Object({
    __typename: Type.Literal(`${IActionKind.ApiAction}`),
    config: IPropDTO,
    errorAction: Typebox.Nullish(IActionRef),
    resource: IRef,
    successAction: Typebox.Nullish(IActionRef),
  }),
])

export type IApiActionDTO = Static<typeof IApiActionDTO>

export const IApiAction = IApiActionDTO

export type IApiAction = Static<typeof IApiAction>
