import { Module } from '@nestjs/common'
import { CodelabLogger } from './logger.service'

@Module({
  exports: [CodelabLogger],
  providers: [CodelabLogger],
})
export class LoggerModule {}
