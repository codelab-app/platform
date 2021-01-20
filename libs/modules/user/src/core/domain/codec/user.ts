import * as t from 'io-ts'
import { UUID } from 'io-ts-types/lib/UUID'

const User = t.type({
  id: UUID,
  email: t.string,
  password: t.string,
})

export type User = t.TypeOf<typeof User>

const json: unknown = {
  /* Some data */
}

const result = User.decode(json)
