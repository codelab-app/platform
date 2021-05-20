import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Auth0Configuration } from './config/auth.config'
import { AuthTokens } from './config/auth.tokens'
import { JwtPayload } from './interfaces/jwt.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // Use the URL helper class, because it's better than relying on the issuer url to not have a trailing /
        jwksUri: new URL(
          '/.well-known/jwks.json',
          config.get<Auth0Configuration>(AuthTokens.Auth0Config)?.issuer,
        ).href,
        handleSigningKeyError: (err) => console.error(err), // do it better in real app!
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: config.get<Auth0Configuration>(AuthTokens.Auth0Config)?.api
        .audience,
      issuer: config.get<Auth0Configuration>(AuthTokens.Auth0Config)?.issuer,
      algorithms: ['RS256'],
    })
  }

  /**
   * At this point, Auth0 has already checked the validity of the JWT token, we can do further validation to check for roles or permissions here.
   *
   * @param payload
   * @returns
   */
  validate(payload: JwtPayload): JwtPayload {
    console.log(payload)

    return payload
  }
}
