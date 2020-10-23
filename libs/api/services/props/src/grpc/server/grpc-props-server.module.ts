import { Module } from '@nestjs/common'
import { GrpcPropsServerController } from './grpc-props-server.controller'

@Module({
  controllers: [GrpcPropsServerController],
})
export class GrpcPropsServerModule {}
