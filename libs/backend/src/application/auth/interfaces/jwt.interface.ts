export type JsonValue = string | number | boolean | null | undefined

export interface JsonObject {
  [k: string]: JsonValue | Array<JsonValue> | JsonObject
}

export interface DgraphClaims extends JsonObject {
  USER: string
  ROLES: Array<string>
}

export interface JwtPayload extends JsonObject {
  'https://dgraph.io/jwt/claims': DgraphClaims
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
}
