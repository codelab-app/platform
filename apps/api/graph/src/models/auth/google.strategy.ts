import { IncomingMessage } from 'http'
import { stringify } from 'querystring'
import { BadRequestException, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import {
  Profile,
  Strategy,
  StrategyOptionsWithRequest,
  VerifyCallback,
} from 'passport-google-oauth20'
import { IGoogleUser } from './IGoogleUser'

const clientID =
  '643753825270-av4vhjsm2vqmkc0oce9jpmjj3nlghp0b.apps.googleusercontent.com'
const clientSecret = 'HfRAgHSWa037f4gVuGFi4WbO'
const callbackURL = '/auth/google/redirect'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      passReqToCallback: true,
      authorizationURL: `https://accounts.google.com/o/oauth2/v2/auth?${stringify(
        {
          client_id: clientID,
          redirect_uri: callbackURL,
          response_type: 'code',
          scope: ['profile', 'email'],
        },
      )}`,
      clientID,
      clientSecret,
      callbackURL,
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
    // TODO: Handle denied access request
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
