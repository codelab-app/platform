import { Void } from '@codelab/backend/infra'
import { Module } from '@nestjs/common'
import { AppAdapter } from './app.adapter'
import { AppResolver } from './app.resolver'
import { AppValidator } from './app.validator'
import {
  CreateAppService,
  DeleteAppService,
  GetAppService,
  GetAppsService,
  UpdateAppService,
} from './use-cases'

const services = [
  CreateAppService,
  DeleteAppService,
  GetAppsService,
  GetAppService,
  UpdateAppService,
  AppValidator,
  AppAdapter,
]

@Module({
  providers: [AppResolver, ...services, Void],
  exports: [...services],
})
export class AppModule {}
