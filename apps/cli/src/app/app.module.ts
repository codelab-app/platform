import { CodelabLoggerModule } from '@codelab/backend/infra/adapter/logger'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { CommandModule } from '../commands/command.module'

@Module({
  controllers: [],
  imports: [
    CommandModule,
    CodelabLoggerModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    // Need to import in module that uses the queue
    // BullModule.registerQueue({
    //   name: 'import-admin-data',
    // }),
  ],
  providers: [],
})
export class AppModule {}
