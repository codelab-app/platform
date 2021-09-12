import { Role } from '@codelab/shared/abstract/core'
import { UpsertUserInput } from '../upsert-user.input'

export const createUserInput: UpsertUserInput = {
  data: {
    auth0Id: 'some-id',
    roles: [Role.User],
  },
}
