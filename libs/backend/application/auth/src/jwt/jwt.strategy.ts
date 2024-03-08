import { auth0Config } from '@codelab/backend/infra/adapter/auth0'
import {
  type Auth0IdToken,
  type JwtPayload,
} from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { type ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import type * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { passportJwtSecret } from 'jwks-rsa'
import type { VerifiedCallback, VerifyCallbackWithRequest } from 'passport-jwt'
import { ExtractJwt, Strategy } from 'passport-jwt'

interface IPassportStrategy {
  validate: VerifyCallbackWithRequest
}

export const JWT_STRATEGY = 'JWT_STRATEGY'

@Injectable()
export class Auth0Strategy
  extends PassportStrategy(Strategy)
  implements IPassportStrategy
{
  constructor(@Inject(auth0Config.KEY) config: ConfigType<typeof auth0Config>) {
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
      passReqToCallback: true,
      // ignoreExpiration: false,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        jwksRequestsPerMinute: 5,
        jwksUri: new URL('.well-known/jwks.json', config.issuer_base_url).href,
        rateLimit: true,
      }),
    })
  }

  async validate(
    req: express.Request,
    payload: JwtPayload,
    done: VerifiedCallback,
  ): Promise<Auth0IdToken> {
    const idToken = req.header('x-id-token')

    // if (!payload.aud.includes(this.config.audience.toString())) {
    //   throw new UnauthorizedException('Audience does not match')
    // }

    if (!idToken) {
      throw new Error('Missing id token')
    }

    const idTokenPayload = jwt.decode(idToken)

    return idTokenPayload as Auth0IdToken
  }
}
