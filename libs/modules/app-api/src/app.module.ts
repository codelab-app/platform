import { ApolloClientModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { AppResolver } from './app.resolver'
import {
  CreateAppService,
  DeleteAppService,
  GetAppService,
  GetAppsService,
  UpdateAppService,
} from './use-cases'

@Module({
  imports: [ApolloClientModule],
  providers: [
    CreateAppService,
    DeleteAppService,
    GetAppsService,
    GetAppService,
    UpdateAppService,
    AppResolver,
  ],
})
export class AppModule {}
