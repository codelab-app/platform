import type { IRole } from './role.enum'

/**
 * Claims are pieces of information about a given subject. In the case of ID Tokens, claims will contain information about the user
 */
export interface CodelabApiClaims {
  /**
   * Possibly undefined on `dev`
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  neo4j_user_id: string
  /* *
   * When it comes from the Auth0 endpoint, the session data is encoded as string, not enum
   */
  roles: Array<keyof typeof IRole>
}

export const JWT_CLAIMS = 'https://api.codelab.app/jwt/claims'

/**
 * ID Tokens are commonly used in token-based authentication to pass user information to a client application. At Auth0, ID Tokens follow the JSON Web Token (JWT) standard; this means that all ID tokens Auth0 issues are JWTs.
 */
export interface Auth0IdToken {
  [JWT_CLAIMS]: CodelabApiClaims
  email: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  email_verified: boolean
  // eslint-disable-next-line @typescript-eslint/naming-convention
  family_name: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  given_name: string
  locale: string
  name: string
  nickname: string
  picture: string
  sid: string
  sub: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  updated_at: string
}

export interface JwtPayload {
  [JWT_CLAIMS]: CodelabApiClaims
  aud: Array<string>
  azp: string
  exp: number
  iat: number
  iss: string
  scope: string
  sub: string
}
