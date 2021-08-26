import {
  Auth0Service,
  AuthModule,
  DgraphModule,
  ServerConfig,
  serverConfig,
} from '@codelab/backend/infra'
import { SeedBaseTypesService } from '@codelab/backend/modules/type'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLClient } from 'graphql-request'
import { SeederService } from './seeder.service'

export const SeederProvider = 'SEEDER_PROVIDER'

@Module({
  imports: [DgraphModule, AuthModule, ConfigModule.forFeature(serverConfig)],
  providers: [
    {
      provide: SeederProvider,
      useFactory: async (
        auth0Service: Auth0Service,
        _serverConfig: ServerConfig,
        seedBaseTypesService: SeedBaseTypesService,
      ) => {
        // const accessToken = (await auth0Service.getAccessToken()) ?? ''
        const accessToken = ''

        const client = new GraphQLClient(
          new URL('graphql', _serverConfig.endpoint).toString(),
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        return new SeederService(_serverConfig, client, seedBaseTypesService)
      },
      inject: [Auth0Service, serverConfig.KEY, SeedBaseTypesService],
    },
  ],
  exports: [SeederProvider],
})
export class SeederModule {}
