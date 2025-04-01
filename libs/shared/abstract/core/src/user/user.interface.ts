import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

import { PreferenceDtoSchema } from '../preference'
import { IRole } from './role.enum'

export const UserDtoSchema = Type.Object({
  apps: Type.Optional(Type.Array(Typebox.RefSchema)),
  auth0Id: Type.String(),
  email: Type.String(),
  id: Type.String(),
  name: Type.String(),
  picture: Type.String(),
  preferences: PreferenceDtoSchema,
  roles: Type.Array(Type.Enum(IRole)),
  username: Type.String(),
})

export type IUserDto = Static<typeof UserDtoSchema>

export type IUserSession = Omit<IUserDto, 'preferences'>

export const UserSchema = UserDtoSchema

export type IUser = Static<typeof UserSchema>

export const OwnerSchema = Type.Object({
  owner: Typebox.RefSchema,
})

export type IOwner = Static<typeof OwnerSchema>
