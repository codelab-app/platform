import { Module } from '@nestjs/common'
import { ApiServerService } from './api-server.service'

@Module({
  providers: [ApiServerService],
  exports: [ApiServerService],
})
export class ApiServerModule {}
