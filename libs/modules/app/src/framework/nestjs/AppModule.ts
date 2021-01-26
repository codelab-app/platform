import { Module, Provider } from '@nestjs/common'
import { CreateAppService } from '../../core/application/useCases/createApp/CreateAppService'
import { DeleteAppService } from '../../core/application/useCases/deleteApp/DeleteAppService'
import { GetAppService } from '../../core/application/useCases/getApp/GetAppService'
import { GetAppsService } from '../../core/application/useCases/getApps/GetAppsService'
import { UpdateAppService } from '../../core/application/useCases/updateApp/UpdateAppService'
import { AppGraphqlAdapter } from '../../presentation/controllers/AppGraphqlAdapter'
import { AppDITokens } from '../AppDITokens'
import { PrismaDITokens } from '@codelab/backend'

export const persistenceProviders: Array<Provider> = [AppGraphqlAdapter]

export const useCaseProviders: Array<Provider> = [
  {
    provide: AppDITokens.GetAppUseCase,
    useFactory: (prismaService) => new GetAppService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: AppDITokens.GetAppsUseCase,
    useFactory: (prismaService) => new GetAppsService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: AppDITokens.DeleteAppUseCase,
    useFactory: (prismaService) => new DeleteAppService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: AppDITokens.CreateAppUseCase,
    useFactory: (prismaService) => new CreateAppService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: AppDITokens.UpdateAppUseCase,
    useFactory: (prismaService) => new UpdateAppService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
]

@Module({
  providers: [...persistenceProviders, ...useCaseProviders],
})
export class AppModule {}
