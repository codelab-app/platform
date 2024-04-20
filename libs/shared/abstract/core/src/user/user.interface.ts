import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRef } from '../model/node-type.interface'
import { IRole } from './role.enum'

export const IUserDto = Type.Object({
  apps: Type.Optional(Type.Array(IRef)),
  auth0Id: Type.String(),
  email: Type.String(),
  id: Type.String(),
  preferences: Type.Optional(Type.String()),
  roles: Type.Array(Type.Enum(IRole)),
  username: Type.String(),
})

export type IUserDto = Static<typeof IUserDto>

export const IUser = IUserDto

export type IUser = Static<typeof IUser>

export const IOwner = Type.Object({
  owner: IRef,
})

export type IOwner = Static<typeof IOwner>
