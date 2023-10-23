import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRedirectKind } from './redirect-kind.enum'

export const IPageRedirectDTO = Type.Composite([
  IEntity,
  Type.Object({
    __typename: Type.Literal(`${IRedirectKind.Page}`),
    page: IEntity,
  }),
])

export type IPageRedirectDTO = Static<typeof IPageRedirectDTO>
