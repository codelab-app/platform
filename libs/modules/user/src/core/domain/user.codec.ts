import * as t from 'io-ts'
import { UUID } from 'io-ts-types'
import { Email, Password } from '@codelab/backend'

/**
 * Dto's, these are primitives
 */
export const UserDTO = t.partial({
  id: t.string,
  email: t.string,
  password: t.string,
  accessToken: t.string,
})

export type UserDTO = t.TypeOf<typeof UserDTO>

/**
 * User ValeObject Codec
 */
export const UserVO = t.intersection([
  t.type({
    email: Email,
    password: Password,
  }),
  t.partial({
    accessToken: t.string,
  }),
])

export type UserVO = t.TypeOf<typeof UserVO>

/**
 * User Entity Codec
 */
export const UserEntity = t.intersection([
  t.type({
    id: UUID,
  }),
  UserVO,
])

export type UserEntity = t.TypeOf<typeof UserEntity>
