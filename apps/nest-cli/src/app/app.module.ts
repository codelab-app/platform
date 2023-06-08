import { LoggerService, Module } from '@nestjs/common'
import { LoggerModule } from '../logger'
import { BasicCommand } from '../task.command'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  controllers: [AppController],
  imports: [],
  providers: [AppService, LoggerModule, BasicCommand],
})
export class AppModule {}
