import { Module } from '@nestjs/common'
import { CreateAppService } from '../../core/application/useCases/createApp/CreateAppService'
import { DeleteAppService } from '../../core/application/useCases/deleteApp/DeleteAppService'
import { GetAppService } from '../../core/application/useCases/getApp/GetAppService'
import { GetAppsService } from '../../core/application/useCases/getApps/GetAppsService'
import { UpdateAppService } from '../../core/application/useCases/updateApp/UpdateAppService'
import { AppResolvers } from '../../presentation/controllers/AppResolvers'
import { PrismaService } from '@codelab/backend'
import { PageModule } from '@codelab/modules/page'

@Module({
  imports: [PageModule],
  providers: [
    PrismaService,
    /**
     * Controllers
     */
    AppResolvers,
    /**
     * UseCaseProviders
     */
    GetAppService,
    GetAppsService,
    DeleteAppService,
    CreateAppService,
    UpdateAppService,
  ],
})
export class AppModule {}
