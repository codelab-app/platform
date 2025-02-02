import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

import { IRole } from './role.enum'

export const UserDtoSchema = Type.Object({
  apps: Type.Optional(Type.Array(Typebox.RefSchema)),
  auth0Id: Type.String(),
  email: Type.String(),
  id: Type.String(),
  roles: Type.Array(Type.Enum(IRole)),
  username: Type.String(),
})

export type IUserDto = Static<typeof UserDtoSchema>

export const UserSchema = UserDtoSchema

export type IUser = Static<typeof UserSchema>

export const OwnerSchema = Type.Object({
  owner: Typebox.RefSchema,
})

export type IOwner = Static<typeof OwnerSchema>
