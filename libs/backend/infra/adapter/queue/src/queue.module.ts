import { WsModule } from '@codelab/backend/infra/adapter/ws'
import { BullModule } from '@nestjs/bullmq'
import { Module } from '@nestjs/common'

import { SeedQueueProcessor } from './queue.processor'

@Module({
  exports: [],
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    WsModule,
  ],
  providers: [SeedQueueProcessor],
})
export class QueueModule {}
