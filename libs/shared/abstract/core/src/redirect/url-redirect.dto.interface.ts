import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRedirectKind } from './redirect-kind.enum'

export const IUrlRedirectDTO = Type.Composite([
  IEntity,
  Type.Object({
    __typename: Type.Literal(`${IRedirectKind.Url}`),
    url: Type.String(),
  }),
])

export type IUrlRedirectDTO = Static<typeof IUrlRedirectDTO>
