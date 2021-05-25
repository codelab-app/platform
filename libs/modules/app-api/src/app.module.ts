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

const services = [
  CreateAppService,
  DeleteAppService,
  GetAppsService,
  GetAppService,
  UpdateAppService,
]

@Module({
  imports: [ApolloClientModule],
  providers: [...services, AppResolver],
  exports: [...services],
})
export class AppModule {}
