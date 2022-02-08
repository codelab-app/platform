import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { GetUserService } from '../../use-cases/get-user'
import { UpsertUserService } from '../../use-cases/upsert-user'
import { Auth0Config, auth0Config } from '../auth0'
import { JwtPayload } from './jwt.interface'

export const jwtLocalStrategyName = 'jwt_local'

@Injectable()
export class JwtLocalStrategy extends PassportStrategy(
  Strategy,
  jwtLocalStrategyName,
) {
  constructor(
    @Inject(auth0Config.KEY) readonly _auth0Config: Auth0Config,
    private getUserService: GetUserService,
    private upsertUserService: UpsertUserService,
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // Use the URL helper class, because it's better than relying on the issuer url to not have a trailing /
        jwksUri: new URL('.well-known/jwks.json', _auth0Config.local.issuer)
          .href,
        handleSigningKeyError: (err) => console.error(err), // do it better in real app!
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: _auth0Config?.audience,
      scope: 'openid email profile roles',
      issuer: _auth0Config?.issuer,
      algorithms: ['RS256'],
    })
  }

  // do nothing with local jwt for now
  protected async validate(payload: JwtPayload): Promise<any> {
    return {}
  }
}
