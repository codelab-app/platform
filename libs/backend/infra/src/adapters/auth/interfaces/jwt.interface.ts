import { Role } from '@codelab/shared/abstract/core'

export interface CodelabApiClaims {
  email: string
  roles: Array<Role>
}

export const JWT_CLAIMS = 'https://api.codelab.ai/jwt/claims'

export interface JwtPayload {
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
