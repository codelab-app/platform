import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLGatewayModule } from '@nestjs/graphql'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/providers/config'

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<ApiConfig>) => {
        return {
          server: {
            cors: true,
          },
          gateway: {
            serviceList: [
              {
                name: `${ApiConfigTypes.FEDERATION_GRAPH_NAME}`,
                url: `http://localhost:${config.get(
                  ApiConfigTypes.FEDERATION_GRAPH_PORT,
                )}/graphql`,
              },
              {
                name: `${ApiConfigTypes.FEDERATION_PROPS_NAME}`,
                url: `http://localhost:${config.get(
                  ApiConfigTypes.FEDERATION_PROPS_PORT,
                )}/graphql`,
              },
            ],
          },
        }
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class FederationModule {}
