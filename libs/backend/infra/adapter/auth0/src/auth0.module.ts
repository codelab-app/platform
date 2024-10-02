import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { auth0Config } from './auth0.config'
import {
  AUTH0_MANAGEMENT_CLIENT_TOKEN,
  Auth0ManagementClientProvider,
} from './management-client.provider'

@Module({
  exports: [AUTH0_MANAGEMENT_CLIENT_TOKEN],
  imports: [
    ConfigModule.forRoot({
      ignoreEnvVars: true,
      load: [auth0Config],
    }),
  ],
  providers: [Auth0ManagementClientProvider],
})
export class Auth0Module {}
