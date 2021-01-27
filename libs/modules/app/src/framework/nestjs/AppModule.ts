import { Module } from '@nestjs/common'
import { CreateAppService } from '../../core/application/useCases/createApp/CreateAppService'
import { DeleteAppService } from '../../core/application/useCases/deleteApp/DeleteAppService'
import { GetAppService } from '../../core/application/useCases/getApp/GetAppService'
import { GetAppsService } from '../../core/application/useCases/getApps/GetAppsService'
import { UpdateAppService } from '../../core/application/useCases/updateApp/UpdateAppService'
import { AppGraphqlAdapter } from '../../presentation/controllers/AppGraphqlAdapter'

@Module({
  providers: [
    AppGraphqlAdapter,
    // UseCaseProviders
    GetAppService,
    GetAppsService,
    DeleteAppService,
    CreateAppService,
    UpdateAppService,
  ],
})
export class AppModule {}
