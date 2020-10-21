import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLGatewayModule } from '@nestjs/graphql'
import { ApiConfig, ApiConfigTypes } from '@codelab/api/config'

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
                name: `${ApiConfigTypes.SERVICES_GRAPH_NAME}`,
                url: `http://localhost:${config.get(
                  ApiConfigTypes.SERVICES_GRAPH_PORT,
                )}/graphql`,
              },
              {
                name: `${ApiConfigTypes.SERVICES_PROPS_NAME}`,
                url: `http://localhost:${config.get(
                  ApiConfigTypes.SERVICES_PROPS_PORT,
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
