import type { Claims } from '@auth0/nextjs-auth0'
import type { IRole } from './role.enum'

export interface CodelabApiClaims extends Claims {
  /**
   * When it comes from the Auth0 endpoint, the session data is encoded as string, not enum
   */
  roles: Array<keyof typeof IRole>
}

export const JWT_CLAIMS = `https://api.codelab.app/jwt/claims`

/**
 * Access tokens are what the OAuth client uses to make requests to an API
 *
 * Not intended to carry user info, used for authorization
 */
export interface AccessTokenPayload {
  /**
   * These are set programmatically inside Auth0 rules
   */
  [JWT_CLAIMS]: CodelabApiClaims
  /** Audience (who or what the token is intended for) */
  aud: Array<string>
  /** Authorization party (the party to which this token was issued) */
  azp?: string
  /** Expiration time (seconds since Unix epoch) */
  exp: number
  /** Grand type */
  gty?: string
  /** Issued at (seconds since Unix epoch) */
  iat: number
  /** Issuer (who created and signed this token) */
  iss: string
  /** Token scope (what the token has access to) */
  scope?: string
  /** Subject (whom the token refers to) */
  sub: string
}

/**
 * Confirm that the user is authenticated and carries user info
 *
 * An ID token contains information about what happened when a user authenticated, and is intended to be read by the OAuth client
 */
export interface IDTokenPayload {
  [JWT_CLAIMS]: CodelabApiClaims
  aud: string
  email: string
  email_verified: false
  exp: number
  iat: number
  iss: string
  name: string
  nickname: string
  picture: string
  sub: string
  updated_at: string
}

export interface Auth0SessionUser {
  [JWT_CLAIMS]: CodelabApiClaims
  email: string
  email_verified: false
  family_name: string
  given_name: string
  locale: string
  name: string
  nickname: string
  picture: string
  sub: string
  updated_at: string
}
