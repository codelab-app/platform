import {
  type Auth0IdToken,
  type IUserDTO,
  JWT_CLAIMS,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const auth0IdToken: Auth0IdToken = {
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

/**
 * We use `mapRequestToUserDto` to create the user dto from the request object
 */
export const userDto: IUserDTO = {
  auth0Id: v4(),
  email: 'admin@codelab.app',
  id: v4(),
  roles: [],
  username: 'Codelab',
}

// export const userDto: IUserDTO = mapAuth0IdTokenToUserDto(auth0IdToken)
