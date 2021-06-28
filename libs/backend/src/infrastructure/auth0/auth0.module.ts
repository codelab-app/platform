import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Auth0Service } from './auth0.service'
import { auth0Config } from './config/auth0.config'
import { Auth0Tokens } from './config/auth0.tokens'

@Module({
  imports: [ConfigModule.forFeature(auth0Config)],
  providers: [Auth0Service],
  exports: [Auth0Service, Auth0Tokens.Auth0Config],
})
export class Auth0Module {}
