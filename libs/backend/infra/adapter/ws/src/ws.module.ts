import { Module } from '@nestjs/common'

import { WsGateway } from './ws-gateway'

@Module({
  exports: [WsGateway],
  providers: [WsGateway],
})
export class WsModule {}
