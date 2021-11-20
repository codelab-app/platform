import { ElementModule } from '@codelab/backend/modules/element'
import { Module } from '@nestjs/common'
import { AppResolver } from './application/app.resolver'
import { AppValidator } from './domain/app.validator'
import { CreateAppService } from './use-cases/create-app'
import { DeleteAppService } from './use-cases/delete-app'
import { ExportAppService } from './use-cases/export-app'
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
  ExportAppService,
  /**
   * Validators
   */
  AppValidator,
]

@Module({
  imports: [ElementModule],
  providers: [AppResolver, ...services],
  exports: [...services],
})
export class AppModule {}
