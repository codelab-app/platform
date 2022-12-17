import type { Claims } from '@auth0/nextjs-auth0'
import type { IRole } from './role.enum'

export interface CodelabApiClaims extends Claims {
  // email: string
  roles: Array<IRole>
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
  /** Issuer (who created and signed this token) */
  iss: string
  /** Subject (whom the token refers to) */
  sub: string
  /** Audience (who or what the token is intended for) */
  aud: Array<string>
  /** Issued at (seconds since Unix epoch) */
  iat: number
  /** Expiration time (seconds since Unix epoch) */
  exp: number
  /** Authorization party (the party to which this token was issued) */
  azp?: string
  /** Token scope (what the token has access to) */
  scope?: string
  /** Grand type */
  gty?: string
}

/**
 * Confirm that the user is authenticated and carries user info
 *
 * An ID token contains information about what happened when a user authenticated, and is intended to be read by the OAuth client
 */
export interface IDTokenPayload {
  [JWT_CLAIMS]: CodelabApiClaims
  nickname: string
  name: string
  picture: string
  updated_at: string
  email: string
  email_verified: false
  iss: string
  sub: string
  aud: string
  iat: number
  exp: number
}

export interface Auth0SessionUser {
  [JWT_CLAIMS]: CodelabApiClaims
  given_name: string
  family_name: string
  nickname: string
  name: string
  picture: string
  locale: string
  updated_at: string
  email: string
  email_verified: false
  sub: string
}
