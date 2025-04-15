import type { IUserDto } from '@codelab/shared-abstract-core'

import { preferenceDefault } from '@codelab/shared-domain-module-preference'
import { v4 } from 'uuid'

export const userDto: IUserDto = {
  auth0Id: v4(),
  email: 'admin@codelab.app',
  id: v4(),
  name: 'Codelab',
  picture: '',
  preferences: preferenceDefault,
  roles: [],
  username: 'Codelab',
}
