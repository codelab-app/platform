import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRedirectKind } from './redirect-kind.enum'

export const IBaseRedirectDTO = Type.Object({
  __typename: Type.Optional(
    Type.Union([
      Type.Literal(`${IRedirectKind.PageRedirect}`),
      Type.Literal(`${IRedirectKind.UrlRedirect}`),
    ]),
  ),
  id: Type.String(),
  kind: Type.Enum(IRedirectKind),
})

export type IBaseRedirectDTO = Static<typeof IBaseRedirectDTO>
