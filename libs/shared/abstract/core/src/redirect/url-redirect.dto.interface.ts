import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseRedirectDTO } from './base-redirect.dto.interface'
import { IRedirectKind } from './redirect-kind.enum'

export const IUrlRedirectDTO = Type.Composite([
  IBaseRedirectDTO,
  Type.Object({
    __typename: Type.Optional(Type.Literal(`${IRedirectKind.UrlRedirect}`)),
    url: Type.String(),
  }),
])

export type IUrlRedirectDTO = Static<typeof IUrlRedirectDTO>
