import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IBaseRedirectDTO } from './base-redirect.dto.interface'
import { IRedirectKind } from './redirect-kind.enum'

export const IPageRedirectDTO = Type.Composite([
  IBaseRedirectDTO,
  Type.Object({
    __typename: Type.Optional(Type.Literal(`${IRedirectKind.PageRedirect}`)),
    page: IEntity,
  }),
])

export type IPageRedirectDTO = Static<typeof IPageRedirectDTO>
