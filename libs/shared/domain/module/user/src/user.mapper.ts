import type { Claims } from '@auth0/nextjs-auth0'
import type {
  UserCreateInput,
  UserDeleteInput,
  UserUpdateInput,
} from '@codelab/shared/infra/gql'

import {
  type Auth0IdToken,
  type IMapper,
  IRole,
  type IUserDto,
  JWT_CLAIMS,
} from '@codelab/shared/abstract/core'

export const mapAuth0IdTokenToUserDto = (
  auth0IdToken?: Auth0IdToken,
): IUserDto => {
  if (!auth0IdToken || !auth0IdToken[JWT_CLAIMS].neo4j_user_id) {
    throw new Error('Missing user in request')
  }

  return {
    auth0Id: auth0IdToken.sub,
    email: auth0IdToken.email,
    id: auth0IdToken[JWT_CLAIMS].neo4j_user_id,
    roles: auth0IdToken[JWT_CLAIMS].roles.map((role) => IRole[role]),
    username: auth0IdToken.nickname,
  }
}

export const mapClaimsToUserDto = (claims?: Claims): IUserDto => {
  if (!claims || !claims[JWT_CLAIMS].neo4j_user_id) {
    throw new Error('Missing user in request')
  }

  return {
    auth0Id: claims['sub'],
    email: claims['email'],
    id: claims[JWT_CLAIMS].neo4j_user_id,
    roles: claims[JWT_CLAIMS].roles.map((role: IRole) => IRole[role]),
    username: claims['nickname'],
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
    roles,
    username,
  }: IUserDto): UserCreateInput => {
    return {
      auth0Id,
      email,
      id,
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
    roles,
    username,
  }: IUserDto): UserUpdateInput => {
    return {
      auth0Id,
      email,
      roles,
      username,
    }
  },
}
