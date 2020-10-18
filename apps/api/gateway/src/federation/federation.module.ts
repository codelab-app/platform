import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLGatewayModule } from '@nestjs/graphql'
import { ApiConfig } from '@codelab/api/config'

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
              // {
              //   name: 'user',
              //   url: `http://localhost${config.get(
              //     'port.services.user',
              //   )}/graphql`,
              // },
              {
                name: 'graph',
                url: `http://localhost:${config.get(
                  'port.services.graph',
                )}/graphql`,
              },
              {
                name: 'prop',
                url: `http://localhost:${config.get(
                  'port.services.props',
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
