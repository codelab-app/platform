import { Role, User } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { passportJwtSecret } from 'jwks-rsa'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { GetUserService } from '../../use-cases/get-user'
import { UpsertUserService } from '../../use-cases/upsert-user'
import { Auth0Config, auth0Config, Auth0Service } from '../auth0'
import { JWT_CLAIMS, JwtPayload } from './jwt.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(auth0Config.KEY) readonly _auth0Config: Auth0Config,
    private getUserService: GetUserService,
    private upsertUserService: UpsertUserService,
    private auth0Service: Auth0Service,
  ) {
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
   * We search the database to see whether the user exists, otherwise we create it
   *
   * @param payload
   * @returns
   */
  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.getUserService.execute({ auth0Id: payload.sub })

    const roles = payload[JWT_CLAIMS].roles.length
      ? payload[JWT_CLAIMS].roles
      : [Role.User]

    let userId

    if (user) {
      userId = user.uid
    } else {
      const { id } = await this.upsertUserService.execute({
        input: {
          data: {
            auth0Id: payload.sub,
            roles,
          },
        },
      })

      userId = id
    }

    return {
      id: userId,
      auth0Id: payload.sub,
      roles,
    }
  }
}
