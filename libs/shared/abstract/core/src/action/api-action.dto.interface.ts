import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IActionKind } from '../action-kind.enum'
import { IRef } from '../model/node-type.interface'
import { IPropDTO } from '../prop.dto.interface'
import { IActionRef } from './action-entity.dto.interface'
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
