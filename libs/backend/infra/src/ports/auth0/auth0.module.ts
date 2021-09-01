import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Auth0Service } from './auth0.service'
import { auth0Config } from './config/auth0.config'

@Module({
  imports: [ConfigModule.forFeature(auth0Config)],
  providers: [Auth0Service],
  exports: [Auth0Service],
})
export class Auth0Module {}
