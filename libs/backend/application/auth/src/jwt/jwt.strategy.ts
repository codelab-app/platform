import type * as express from 'express'
import type { VerifiedCallback, VerifyCallbackWithRequest } from 'passport-jwt'

import { auth0Config } from '@codelab/backend/infra/adapter/auth0'
import { IUserDto, IUserSession, type JwtPayload } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { type ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserRepository } from '@codelab/backend/domain/user'

interface IPassportStrategy {
  validate: VerifyCallbackWithRequest
}

export const JWT_STRATEGY = 'JWT_STRATEGY'

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy)
  implements IPassportStrategy
{
  constructor(
    @Inject(auth0Config.KEY) config: ConfigType<typeof auth0Config>,
    private userRepository: UserRepository,
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
  ): Promise<IUserSession> {
    /**
     * We pass the id token in the header to the backend instead of calling the auth0 token endpoint
     *
     * We do this to make the user available in the request context
     */
    // const idToken = req.header('x-id-token')
    const id = req.header('x-user-id')

    // if (!payload.aud.includes(this.config.audience.toString())) {
    //   throw new UnauthorizedException('Audience does not match')
    // }

    if (!id) {
      //  throw new Error('Missing id token')
      throw new Error('Missing user id')
    }

    // const idTokenPayload = jwt.decode(idToken)
    // return idTokenPayload as Auth0IdToken

    const user = await this.userRepository.findOne({ where: { id } })

    if (!user) {
      throw new Error('User not found')
    }

    return {
      auth0Id: user.auth0Id,
      email: user.email,
      id: user.id,
      roles: user.roles ?? [],
      username: user.username,
      apps: user.apps,
    }
  }
}
