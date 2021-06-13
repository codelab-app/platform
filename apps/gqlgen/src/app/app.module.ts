import { Module } from '@nestjs/common'
import { ConsoleModule } from 'nestjs-console'
import { AppService } from './app.service'
import { AppDevModule } from './dev/app-dev.module'
import { AppE2eModule } from './e2e/app-e2e.module'

@Module({
  imports: [ConsoleModule, AppDevModule, AppE2eModule],
  providers: [AppService],
})
export class AppModule {}
