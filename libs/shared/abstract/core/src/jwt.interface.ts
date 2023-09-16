/* eslint-disable @typescript-eslint/naming-convention */
import type { Claims } from '@auth0/nextjs-auth0'
import type { IRole } from './role.enum'

/**
 * Claims are pieces of information about a given subject. In the case of ID Tokens, claims will contain information about the user
 */
export interface CodelabApiClaims {
  /**
   * When it comes from the Auth0 endpoint, the session data is encoded as string, not enum
   */
  roles: Array<keyof typeof IRole>
  user_id: string
}

export const JWT_CLAIMS = `https://api.codelab.app/jwt/claims`

/**
 * ID Tokens are commonly used in token-based authentication to pass user information to a client application. At Auth0, ID Tokens follow the JSON Web Token (JWT) standard; this means that all ID tokens Auth0 issues are JWTs.
 */
export interface Auth0IdToken {
  [JWT_CLAIMS]: CodelabApiClaims
  email: string
  email_verified: boolean
  family_name: string
  given_name: string
  locale: string
  name: string
  nickname: string
  picture: string
  sid: string
  sub: string
  updated_at: string
}
