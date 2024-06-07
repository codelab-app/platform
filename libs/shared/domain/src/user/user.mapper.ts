import {
  type Auth0IdToken,
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
