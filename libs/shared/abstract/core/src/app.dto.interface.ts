import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IAuth0Owner } from './user.interface'

export const IAppDTO = Type.Composite([
  /**
   * Owner required for composite key
   */
  IAuth0Owner,
  Type.Object({
    _compositeKey: Type.String(),
    domains: Type.Optional(Type.Array(IEntity)),
    id: Type.String(),
    pages: Type.Optional(Type.Array(IEntity)),
  }),
])

export type IAppDTO = Static<typeof IAppDTO>

export const IAppModel = Type.Composite([
  IAppDTO,
  Type.Object({
    name: Type.String(),
    slug: Type.String(),
  }),
])

export type IAppModel = Static<typeof IAppModel>
