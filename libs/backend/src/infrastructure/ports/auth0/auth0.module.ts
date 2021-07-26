import { Module } from '@nestjs/common'
import { Auth0Service } from './auth0.service'
import { auth0Config } from './config/auth0.config'
import { Auth0Tokens } from './config/auth0.tokens'

@Module({
  providers: [
    Auth0Service,
    {
      provide: Auth0Tokens.Auth0Config,
      useValue: auth0Config(),
    },
  ],
  exports: [Auth0Service],
})
export class Auth0Module {}
