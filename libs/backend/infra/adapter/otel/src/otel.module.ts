import { Global, Module } from '@nestjs/common'
import { TraceService } from './trace.service'

@Global()
@Module({
  exports: [TraceService],
  providers: [TraceService],
})
export class OtelModule {}
