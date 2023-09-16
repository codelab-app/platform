import { IEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRole } from './role.enum'

export const IUserDTO = Type.Object({
  apps: Type.Optional(Type.Array(IEntity)),
  auth0Id: Type.String(),
  email: Type.String(),
  id: Type.String(),
  roles: Type.Array(Type.Enum(IRole)),
  username: Type.String(),
})

export type IUserDTO = Static<typeof IUserDTO>

// export const IAuth0User = Type.Object({
//   auth0Id: Type.String(),
// })

// export type IAuth0User = Static<typeof IAuth0User>

export const IOwner = Type.Object({
  owner: IEntity,
})

export type IOwner = Static<typeof IOwner>
