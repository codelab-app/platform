import { Module } from '@nestjs/common'
import { CreateAppService } from './use-cases/create-app/create-app.service'
import { DeleteAppService } from './use-cases/delete-app/delete-app.service'
import { GetAppsService } from './use-cases/get-apps/get-apps.service'
import { UpdateAppService } from './use-cases/update-app/update-app.service'

@Module({
  providers: [
    CreateAppService,
    DeleteAppService,
    GetAppsService,
    UpdateAppService,
  ],
})
export class AppModule {}
