import { IncomingMessage } from 'http'
import { stringify } from 'querystring'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import {
  Profile,
  Strategy,
  StrategyOptionsWithRequest,
  VerifyCallback,
} from 'passport-google-oauth20'
import { IGoogleUser } from './IGoogleUser'
import { ApiConfig, ApiConfigTypes } from '@codelab/alpha/api/providers/config'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly config: ConfigService<ApiConfig>) {
    super({
      passReqToCallback: true,
      authorizationURL: `${config.get(
        ApiConfigTypes.GOOGLE_AUTH_URL,
      )}?${stringify({
        client_id: config.get(ApiConfigTypes.GOOGLE_CLIENT_ID),
        redirect_uri: config.get(ApiConfigTypes.GOOGLE_CALLBACK_URL),
        response_type: 'code',
        scope: ['profile', 'email'],
      })}`,
      clientID: config.get(ApiConfigTypes.GOOGLE_CLIENT_ID),
      clientSecret: config.get(ApiConfigTypes.GOOGLE_CLIENT_SECRET),
      callbackURL: config.get(ApiConfigTypes.GOOGLE_CALLBACK_URL),
      scope: ['profile', 'email'],
    } as StrategyOptionsWithRequest)
  }

  async validate(
    req: IncomingMessage,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    if (!profile) {
      done(new BadRequestException(), null)
    }

    // Get google account information
    const user: IGoogleUser = {
      userId: profile.id,
      name: profile.displayName,
      username: profile.emails?.[0].value,
      picture: profile.photos?.[0].value,
      roles: ['user'],
    }

    done('', user)
  }
}
