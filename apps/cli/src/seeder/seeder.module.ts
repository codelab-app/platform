import {
  Auth0Service,
  AuthModule,
  DgraphModule,
  ServerConfig,
  serverConfig,
} from '@codelab/backend/infra'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
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
      ) => {
        const accessToken = (await auth0Service.getAccessToken()) ?? ''

        return new SeederService(_serverConfig, accessToken)
      },
      inject: [Auth0Service, serverConfig.KEY],
    },
  ],
  exports: [SeederProvider],
})
export class SeederModule {}
