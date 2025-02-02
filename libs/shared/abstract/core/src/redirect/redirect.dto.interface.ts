import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

import { IRedirectTargetType } from './redirect-target-type.enum'

export const RedirectDtoSchema = Type.Object({
  authGuard: Typebox.RefSchema,
  id: Type.String(),
  source: Typebox.RefSchema,
  targetPage: Typebox.Nullish(Typebox.RefSchema),
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
