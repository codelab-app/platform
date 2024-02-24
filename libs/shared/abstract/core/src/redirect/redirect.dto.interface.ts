import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/node-type.interface'
import { IRedirectTargetType } from './redirect-target-type.enum'

export const IRedirectDto = Type.Object({
  authGuard: IRef,
  id: Type.String(),
  source: IRef,
  targetPage: Typebox.Nullish(IRef),
  targetType: Type.Enum(IRedirectTargetType),
  targetUrl: Typebox.Nullish(Type.String()),
})

export type IRedirectDto = Static<typeof IRedirectDto>

export const IRedirect = IRedirectDto

export type IRedirect = Static<typeof IRedirect>

export const ICanActivate = Type.Object({
  authorization: Typebox.Nullish(Type.String()),
  domain: Type.String(),
  pageUrl: Type.String(),
})

export type ICanActivate = Static<typeof ICanActivate>
