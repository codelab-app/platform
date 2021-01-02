import { Module, Provider } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { DeleteUserCommandHandler } from '../../core/application/handlers/DeleteUserCommandHandler'
import { GetUsersQueryHandler } from '../../core/application/handlers/GetUsersQueryHandler'
import { LoginUserQueryHandler } from '../../core/application/handlers/LoginUserQueryHandler'
import { RegisterUserCommandHandler } from '../../core/application/handlers/RegisterUserCommandHandler'
import { UpdateUserCommandHandler } from '../../core/application/handlers/UpdateUserCommandHandler'
import { DeleteUserService } from '../../core/application/services/DeleteUserService'
import { GetUserService } from '../../core/application/services/GetUserService'
import { LoginUserService } from '../../core/application/services/LoginUserService'
import { RegisterUserService } from '../../core/application/services/RegisterUserService'
import { UpdateUserService } from '../../core/application/services/UpdateUserService'
import { TypeOrmUserRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmUserRepositoryAdapter'
import { UsersCommandQueryAdapter } from '../../presentation/controllers/UsersCommandQueryAdapter'
import { UsersDITokens } from '../UsersDITokens'
import { TypeOrmUser } from '@codelab/backend'

export const persistenceProviders: Array<Provider> = [
  {
    provide: UsersDITokens.UsersRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmUserRepositoryAdapter),
    inject: [Connection],
  },
  UsersCommandQueryAdapter,
]

export const useCaseProviders: Array<Provider> = [
  {
    provide: UsersDITokens.LoginUserUseCase,
    useFactory: (usersRepository, moduleRef) =>
      new LoginUserService(usersRepository, moduleRef),
    inject: [UsersDITokens.UsersRepository, ModuleRef],
  },
  {
    provide: UsersDITokens.RegisterUserUseCase,
    useFactory: (usersRepository, moduleRef) =>
      new RegisterUserService(usersRepository, moduleRef),
    inject: [UsersDITokens.UsersRepository, ModuleRef],
  },
  {
    provide: UsersDITokens.EditUserUseCase,
    useFactory: (userRepository) => new UpdateUserService(userRepository),
    inject: [UsersDITokens.UsersRepository],
  },
  {
    provide: UsersDITokens.DeleteUserUseCase,
    useFactory: (userRepository) => new DeleteUserService(userRepository),
    inject: [UsersDITokens.UsersRepository],
  },
  {
    provide: UsersDITokens.GetUserUseCase,
    useFactory: (userRepository) => new GetUserService(userRepository),
    inject: [UsersDITokens.UsersRepository],
  },
]

export const handlerProviders: Array<Provider> = [
  LoginUserQueryHandler,
  RegisterUserCommandHandler,
  DeleteUserCommandHandler,
  UpdateUserCommandHandler,
  GetUsersQueryHandler,
]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([TypeOrmUser])],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class UsersModule {}
