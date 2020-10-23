import { join } from 'path'
import { DynamicModule, Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { GrpcPropsClientService } from './grpc-props-client.service'
import { ApiConfigTypes } from '@codelab/api/providers/config'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: `${ApiConfigTypes.GRPC_PROPS_PACKAGE}`,
        useFactory: () => {
          return {
            transport: Transport.GRPC,
            options: {
              package: 'api.federation.props',
              protoPath: join(
                process.cwd(),
                'apps/api/federation/props/src/proto/props.proto',
              ),
            },
          }
        },
      },
    ]),
  ],
  providers: [GrpcPropsClientService],
  exports: [GrpcPropsClientService],
})
export class GrpcPropsClientModule {
  static forRoot(options: any): DynamicModule {
    return {
      module: GrpcPropsClientModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
      ],
      exports: [],
    }
  }
}
