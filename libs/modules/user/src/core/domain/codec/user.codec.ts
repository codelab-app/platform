import * as t from 'io-ts'
import { UUID } from 'io-ts-types'
import { Email, Password } from '@codelab/backend'

/**
 * Dto's, these are primitives
 */
export const UserDtoC = t.partial({
  id: t.string,
  email: t.string,
  password: t.string,
  accessToken: t.string,
})

export type UserDtoC = t.TypeOf<typeof UserDtoC>

/**
 * User ValeObject Codec
 */
export const UserVoC = t.intersection([
  t.type({
    email: Email,
    password: Password,
  }),
  t.partial({
    accessToken: t.string,
  }),
])

export type UserVoC = t.TypeOf<typeof UserVoC>

/**
 * User Entity Codec
 */
export const UserEntityC = t.intersection([
  t.type({
    id: UUID,
  }),
  UserVoC,
])

export type UserEntityC = t.TypeOf<typeof UserEntityC>
