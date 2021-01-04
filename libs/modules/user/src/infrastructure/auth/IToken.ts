export interface IHasuraClaims {
  'x-hasura-allowed-roles': Array<string>
  'x-hasura-default-role': string
  'x-hasura-user-id': string
}

export interface IToken {
  username: string
  sub: string
  iat: number
  exp: number
  'https://hasura.io/jwt/claims': IHasuraClaims
}
