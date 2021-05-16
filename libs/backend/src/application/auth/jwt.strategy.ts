import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Auth0Configuration } from './config/authConfig'
import { JwtPayload } from './interfaces/jwt.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: new URL( //Use the URL helper class, because it's better than relying on the issuer url to not have a trailing /
          '/.well-known/jwks.json',
          config.get<Auth0Configuration>('auth0')?.issuer,
        ).href,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: config.get<Auth0Configuration>('auth0')?.clientId,
      issuer: config.get<Auth0Configuration>('auth0')?.issuer,
      algorithms: ['RS256'],
    })
  }

  validate(payload: JwtPayload): JwtPayload {
    //TODO check in dgraph if the user exists

    return payload
  }
}
