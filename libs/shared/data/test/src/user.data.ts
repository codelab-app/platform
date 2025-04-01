import {
  type Auth0IdToken,
  type IUserDto,
  JWT_CLAIMS,
} from '@codelab/shared/abstract/core'
import { preferenceDefault } from '@codelab/shared-domain-module/preference'
import { v4 } from 'uuid'

export const adminUser: Auth0IdToken = {
  email: 'admin@codelab.app',
  email_verified: true,
  family_name: '',
  given_name: '',
  [JWT_CLAIMS]: {
    neo4j_user_id: v4(),
    roles: [],
  },
  locale: '',
  name: '',
  // roles: [],
  nickname: 'Codelab',
  picture: '',
  sid: '',
  sub: v4(),
  updated_at: '',
}

export const guestUser: Auth0IdToken = {
  email: '',
  email_verified: false,
  family_name: '',
  given_name: '',
  'https://api.codelab.app/jwt/claims': { neo4j_user_id: v4(), roles: [] },
  locale: '',
  name: '',
  nickname: '',
  picture: '',
  sid: v4(),
  sub: v4(),
  updated_at: '',
}

/**
 * We use `mapRequestToUserDto` to create the user dto from the request object
 */
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
