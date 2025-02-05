import type * as express from 'express'
import type { VerifiedCallback, VerifyCallbackWithRequest } from 'passport-jwt'

import { auth0Config } from '@codelab/backend/infra/adapter/auth0'
import {
  IRole,
  IUserSession,
  JWT_CLAIMS,
  JwtPayload,
} from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { type ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserInfoClient } from 'auth0'

interface IPassportStrategy {
  validate: VerifyCallbackWithRequest
}

export const JWT_STRATEGY = 'JWT_STRATEGY'

@Injectable()
export class JwtStrategy
  extends PassportStrategy(Strategy)
  implements IPassportStrategy
{
  private userInfoClient: UserInfoClient
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

    this.userInfoClient = new UserInfoClient({ domain: config.auth0_domain })
  }

  async validate(
    req: express.Request,
    payload: JwtPayload,
    done: VerifiedCallback,
  ): Promise<IUserSession> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)

    const { data: auth0IdToken } = await this.userInfoClient.getUserInfo(
      token ?? '',
    )

    return {
      auth0Id: payload.sub,
      email: auth0IdToken.email,
      id: payload[JWT_CLAIMS].neo4j_user_id,
      roles: payload[JWT_CLAIMS].roles.map((role) => IRole[role]),
      username: auth0IdToken.nickname,
    }

    // /**
    //  * We pass the id token in the header to the backend instead of calling the auth0 token endpoint
    //  *
    //  * We do this to make the user available in the request context
    //  */
    // const idToken = req.header('x-id-token')

    // if (!idToken) {
    //   throw new Error('Missing id token')
    // }

    // const idTokenPayload = jwt.decode(idToken)
    // return mapAuth0IdTokenToUserDto(idTokenPayload as Auth0IdToken)
  }
}
