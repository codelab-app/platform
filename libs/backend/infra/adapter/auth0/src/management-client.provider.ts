import type { FactoryProvider } from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import { ManagementClient } from 'auth0'
import { auth0Config, auth0M2mConfig } from './auth0.config'

export const AUTH0_MANAGEMENT_CLIENT_TOKEN = 'AUTH0_MANAGEMENT_CLIENT_TOKEN'

export const Auth0ManagementClientProvider: FactoryProvider<ManagementClient> =
  {
    inject: [auth0Config.KEY, auth0M2mConfig.KEY],
    provide: AUTH0_MANAGEMENT_CLIENT_TOKEN,
    useFactory: (
      config: ConfigType<typeof auth0Config>,
      m2mConfig: ConfigType<typeof auth0M2mConfig>,
    ) => {
      const client = new ManagementClient({
        clientId: m2mConfig.clientId,
        clientSecret: m2mConfig.clientSecret,
        domain: config.audience.hostname,
      })

      return client
    },
  }
