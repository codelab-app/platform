import { auth0Config } from '@codelab/backend/infra/adapter/auth0'
import {
  type Auth0IdToken,
  JWT_CLAIMS,
  type JwtPayload,
} from '@codelab/shared/abstract/core'
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(auth0Config.KEY) private config: ConfigType<typeof auth0Config>,
  ) {
    super({
      algorithms: ['RS256'],
      /**
       * `passport-jwt` does not support array audience. This isn't really needed to work, just a way to filter out JWT from audience that isn't included.
       *
       * We can move to custom validate method
       */
      // audience: config.audience,
      issuer: config.issuer_base_url,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        jwksRequestsPerMinute: 5,
        jwksUri: new URL('.well-known/jwks.json', config.issuer_base_url).href,
        rateLimit: true,
      }),
    })
  }

  // TODO: How to get the full user session object
  async validate(payload: JwtPayload): Promise<Partial<Auth0IdToken>> {
    if (!payload.aud.includes(this.config.audience.toString())) {
      throw new UnauthorizedException('Audience does not match')
    }

    return payload
  }
}
