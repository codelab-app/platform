import * as path from 'path'
import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { NodeResolvers } from './node.resolvers'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NODE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'api.federation.props',
          url: 'localhost:50051',
          protoPath: path.join(
            process.cwd(),
            'apps/api/federation/props/src/proto/props.proto',
          ),
        },
      },
    ]),
  ],
  providers: [NodeResolvers],
  exports: [],
})
export class GraphqlNodeModule {}
