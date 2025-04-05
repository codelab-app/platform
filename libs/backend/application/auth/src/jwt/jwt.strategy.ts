import type { VerifiedCallback, VerifyCallbackWithRequest } from 'passport-jwt'

import { auth0Config } from '@codelab/backend/infra/adapter/auth0'
import {
  IRole,
  IUserSession,
  JWT_CLAIMS,
  JwtPayload,
} from '@codelab/shared/abstract/core'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { type ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { UserInfoClient, UserInfoResponse } from 'auth0'
import { Cache } from 'cache-manager'
import { Request } from 'express'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'

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
    @Inject(auth0Config.KEY)
    private readonly config: ConfigType<typeof auth0Config>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    req: Request,
    payload: JwtPayload,
    done: VerifiedCallback,
  ): Promise<IUserSession> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)

    if (!token) {
      throw new Error('Missing bearer token')
    }

    const auth0Id = payload.sub
    const auth0IdToken = await this.getCachedUserInfo(auth0Id, token)

    return {
      auth0Id: payload.sub,
      email: auth0IdToken.email,
      id: payload[JWT_CLAIMS].neo4j_user_id,
      name: auth0IdToken.name,
      picture: auth0IdToken.picture ?? '',
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

  /**
   * https://community.auth0.com/t/too-many-requests-when-calling-userinfo/26685
   */
  private async getCachedUserInfo(auth0Id: string, token: string) {
    const cacheKey = `userInfo:${auth0Id}`

    const cachedUserInfo = await this.cacheManager.get<UserInfoResponse>(
      cacheKey,
    )

    if (cachedUserInfo) {
      this.logger.debug(`Using cached user info for auth0Id: ${auth0Id}`)

      return cachedUserInfo
    }

    this.logger.debug(`Fetching user info from Auth0 for auth0Id: ${auth0Id}`)

    const client = new UserInfoClient({
      domain: this.config.auth0_domain,
    })

    const { data: userInfo } = await client.getUserInfo(token)

    await this.cacheManager.set(cacheKey, userInfo, 3600)

    return userInfo
  }

  private readonly logger = new Logger(JwtStrategy.name)
}
