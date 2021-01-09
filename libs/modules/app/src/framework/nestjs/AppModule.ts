import { Module, Provider } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { Connection } from 'typeorm'
import { CreateAppCommandHandler } from '../../core/application/handlers/CreateAppCommandHandler'
import { GetAppsQueryHandler } from '../../core/application/handlers/GetAppsQueryHandler'
import { CreateAppService } from '../../core/application/useCases/createApp/CreateAppService'
import { GetAppsService } from '../../core/application/useCases/getApps/GetAppsService'
import { TypeOrmAppRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmAppRepositoryAdapter'
import { AppCommandQueryAdapter } from '../../presentation/controllers/AppCommandQueryAdapter'
import { AppDITokens } from '../AppDITokens'

export const persistenceProviders: Array<Provider> = [
  {
    provide: AppDITokens.AppRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmAppRepositoryAdapter),
    inject: [Connection],
  },
  AppCommandQueryAdapter,
]

export const useCaseProviders: Array<Provider> = [
  {
    provide: AppDITokens.GetAppsUseCase,
    useFactory: (appRepository) => new GetAppsService(appRepository),
    inject: [AppDITokens.AppRepository],
  },
  {
    provide: AppDITokens.CreateAppUseCase,
    useFactory: (appRepository, moduleRef) =>
      new CreateAppService(appRepository),
    inject: [AppDITokens.AppRepository, ModuleRef],
  },
]

export const handlerProviders: Array<Provider> = [
  GetAppsQueryHandler,
  CreateAppCommandHandler,
]

@Module({
  imports: [CqrsModule],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class AppModule {}
