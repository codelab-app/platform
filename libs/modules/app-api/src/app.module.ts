import { Void } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { AppMapper } from './app.mapper'
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
  AppMapper,
]

@Module({
  providers: [AppResolver, ...services, Void],
  exports: [...services],
})
export class AppModule {}
