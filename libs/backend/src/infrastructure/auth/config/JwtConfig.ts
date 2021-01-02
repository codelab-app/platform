import { get } from 'env-var'

export class JwtConfig {
  public static readonly JWT_SECRET: string = get('JWT_SECRET')
    .required()
    .asString()

  public static readonly JWT_EXPIRY: string = get('JWT_EXPIRY')
    .required()
    .asString()
}
