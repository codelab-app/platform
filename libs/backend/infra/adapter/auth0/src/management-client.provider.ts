import type { FactoryProvider } from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import { ManagementClient } from 'auth0'
import { auth0Config } from './auth0.config'

export const AUTH0_MANAGEMENT_CLIENT_TOKEN = 'AUTH0_MANAGEMENT_CLIENT_TOKEN'

export const Auth0ManagementClientProvider: FactoryProvider<ManagementClient> =
  {
    inject: [auth0Config.KEY],
    provide: AUTH0_MANAGEMENT_CLIENT_TOKEN,
    useFactory: (config: ConfigType<typeof auth0Config>) => {
      const client = new ManagementClient({
        clientId: config.m2m.clientId,
        clientSecret: config.m2m.clientSecret,
        domain: config.audience.hostname,
      })

      return client
    },
  }
