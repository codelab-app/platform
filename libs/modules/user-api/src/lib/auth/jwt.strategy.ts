import type { Auth0Configuration } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${
          config.get<Auth0Configuration>('auth0')?.issuer
        }.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: config.get<Auth0Configuration>('auth0')?.audience,
      issuer: `${config.get<Auth0Configuration>('auth0')?.issuer}`,
      algorithms: ['RS256'],
    })
  }

  validate(payload: unknown): unknown {
    console.log('payload', payload)

    return payload
  }
}
