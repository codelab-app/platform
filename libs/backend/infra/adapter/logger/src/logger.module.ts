import { Module } from '@nestjs/common'
import { LoggerModule } from 'nestjs-pino'
import { CodelabLogger } from './logger.service'

@Module({
  exports: [CodelabLogger],
  imports: [LoggerModule.forRoot()],
  providers: [CodelabLogger],
})
export class CodelabLoggerModule {}
