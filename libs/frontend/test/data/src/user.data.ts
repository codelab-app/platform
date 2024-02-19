import type { IUserDto } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const userDto: IUserDto = {
  auth0Id: v4(),
  email: 'admin@codelab.app',
  id: v4(),
  roles: [],
  username: 'Codelab',
}
