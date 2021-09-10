import { User } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'
import type { Auth0Config } from '../../../ports'
import { auth0Config } from '../../../ports'
import { JWT_CLAIMS, JwtPayload } from '../interfaces/jwt.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(auth0Config.KEY) readonly _auth0Config: Auth0Config) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // Use the URL helper class, because it's better than relying on the issuer url to not have a trailing /
        jwksUri: new URL('.well-known/jwks.json', _auth0Config.issuer).href,
        handleSigningKeyError: (err) => console.error(err), // do it better in real app!
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: _auth0Config?.audience,
      scope: 'openid email profile roles',
      issuer: _auth0Config?.issuer,
      algorithms: ['RS256'],
    })
  }

  /**
   * At this point, Auth0 has already checked the validity of the JWT token, we can do further validation to check for roles or permissions here.
   *
   * @param payload
   * @returns
   */
  validate(payload: JwtPayload): User {
    return {
      id: payload.sub,
      auth0Id: payload.sub,
      roles: payload[JWT_CLAIMS].roles,
    }
  }
}
