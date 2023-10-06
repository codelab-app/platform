import { Module } from '@nestjs/common'
import { TraceService } from './trace.service'

@Module({
  exports: [TraceService],
  providers: [TraceService],
})
export class OtelModule {}
