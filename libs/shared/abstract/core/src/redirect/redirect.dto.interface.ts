import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/ref.interface'
import { IRedirectTargetType } from './redirect-target-type.enum'

export const RedirectDtoSchema = Type.Object({
  authGuard: Typebox.Ref,
  id: Type.String(),
  source: Typebox.Ref,
  targetPage: Typebox.Nullish(Typebox.Ref),
  targetType: Type.Enum(IRedirectTargetType),
  targetUrl: Typebox.Nullish(Type.String()),
})

export type IRedirectDto = Static<typeof RedirectDtoSchema>

export const RedirectSchema = RedirectDtoSchema

export type IRedirect = Static<typeof RedirectSchema>

export const CanActivateSchema = Type.Object({
  authorization: Typebox.Nullish(Type.String()),
  domain: Type.String(),
  pageUrlPattern: Type.String(),
})

export type ICanActivate = Static<typeof CanActivateSchema>
