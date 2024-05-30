import { Typebox } from '@codelab/shared/abstract/typebox'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/ref.interface'
import { IRole } from './role.enum'

export const UserDtoSchema = Type.Object({
  apps: Type.Optional(Type.Array(Typebox.Ref)),
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
  owner: Typebox.Ref,
})

export type IOwner = Static<typeof OwnerSchema>
