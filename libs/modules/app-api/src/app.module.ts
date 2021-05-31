import { Module } from '@nestjs/common'
import { AppResolver } from './app.resolver'
import { AppGuardService } from './auth'
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
  AppGuardService,
]

@Module({
  providers: [...services, AppResolver],
  exports: [...services],
})
export class AppModule {}
