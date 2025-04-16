import type { User } from '@auth0/nextjs-auth0/types'
import type {
  IMapper,
  IUserDto,
  IUserSession,
} from '@codelab/shared-abstract-core'
import type {
  UserCreateInput,
  UserDeleteInput,
  UserUpdateInput,
} from '@codelab/shared-infra-gqlgen'

import { JWT_CLAIMS } from '@codelab/shared-abstract-core'
import { preferenceMapper } from '@codelab/shared-domain-module-preference'

// export const mapAuth0IdTokenToUserDto = (
//   auth0IdToken?: Auth0IdToken,
// ): IUserSession => {
//   if (!auth0IdToken || !auth0IdToken[JWT_CLAIMS].neo4j_user_id) {
//     throw new Error('Missing user in request')
//   }

//   return {
//     auth0Id: auth0IdToken.sub,
//     email: auth0IdToken.email,
//     id: auth0IdToken[JWT_CLAIMS].neo4j_user_id,
//     roles: auth0IdToken[JWT_CLAIMS].roles.map((role) => IRole[role]),
//     username: auth0IdToken.nickname,
//   }
// }

export const mapClaimsToUserDto = (user?: User): IUserSession => {
  if (!user || !user[JWT_CLAIMS].neo4j_user_id) {
    throw new Error('Missing user in request')
  }

  return {
    auth0Id: user.sub,
    email: user.email ?? '',
    id: user[JWT_CLAIMS].neo4j_user_id,
    name: user.name ?? '',
    picture: user.picture ?? '',
    roles: user[JWT_CLAIMS].roles,
    username: user.nickname ?? '',
  }
}

export const userMapper: IMapper<
  IUserDto,
  UserCreateInput,
  UserUpdateInput,
  UserDeleteInput
> = {
  toCreateInput: ({
    auth0Id,
    email,
    id,
    name,
    picture,
    preferences,
    roles,
    username,
  }: IUserDto): UserCreateInput => {
    return {
      auth0Id,
      email,
      id,
      name,
      picture,
      preferences: {
        create: {
          node: preferenceMapper.toCreateInput(preferences),
        },
      },
      roles,
      username,
    }
  },

  toDeleteInput: () => {
    return {}
  },

  toUpdateInput: ({
    auth0Id,
    email,
    name,
    picture,
    preferences,
    roles,
    username,
  }: IUserDto): UserUpdateInput => {
    return {
      auth0Id,
      email,
      name,
      picture,
      preferences: {
        update: {
          node: preferenceMapper.toUpdateInput(preferences),
        },
      },
      roles,
      username,
    }
  },
}
