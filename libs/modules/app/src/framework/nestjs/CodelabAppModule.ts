import { Module, Provider } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { Connection } from 'typeorm'
import { CreateAppCommandHandler } from '../../core/application/handlers/CreateAppCommandHandler'
import { CreateAppService } from '../../core/application/useCases/createApp/CreateAppService'
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
    provide: AppDITokens.CreateAppUseCase,
    useFactory: (appRepository, moduleRef) =>
      new CreateAppService(appRepository, moduleRef),
    inject: [AppDITokens.AppRepository, ModuleRef],
  },
]

export const handlerProviders: Array<Provider> = [CreateAppCommandHandler]

@Module({
  imports: [CqrsModule],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class CodelabAppModule {}
