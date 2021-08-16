import { Void } from '@codelab/backend/infra'
import { Module } from '@nestjs/common'
import { AppAdapter } from './application/app.adapter'
import { AppResolver } from './application/app.resolver'
import { AppValidator } from './domain/app.validator'
import { CreateAppService } from './use-cases/create-app'
import { DeleteAppService } from './use-cases/delete-app'
import { GetAppService } from './use-cases/get-app'
import { GetAppsService } from './use-cases/get-apps'
import { UpdateAppService } from './use-cases/update-app'

const services = [
  /**
   * Use Cases
   */
  CreateAppService,
  DeleteAppService,
  GetAppsService,
  GetAppService,
  UpdateAppService,
  /**
   * Adapters
   */
  AppAdapter,
  /**
   * Validators
   */
  AppValidator,
]

@Module({
  providers: [AppResolver, ...services, Void],
  exports: [...services],
})
export class AppModule {}
