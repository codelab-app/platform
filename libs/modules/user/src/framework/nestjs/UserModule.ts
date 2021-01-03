import { Module, Provider } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { TypeOrmAppRepositoryAdapter } from '../../../../app/src/infrastructure/persistence/TypeOrmAppRepositoryAdapter'
import { DeleteUserCommandHandler } from '../../core/application/handlers/DeleteUserCommandHandler'
import { GetMeQueryHandler } from '../../core/application/handlers/GetMeQueryHandler'
import { GetUsersQueryHandler } from '../../core/application/handlers/GetUsersQueryHandler'
import { LoginUserQueryHandler } from '../../core/application/handlers/LoginUserQueryHandler'
import { RegisterUserCommandHandler } from '../../core/application/handlers/RegisterUserCommandHandler'
import { UpdateUserCommandHandler } from '../../core/application/handlers/UpdateUserCommandHandler'
import { UserService } from '../../core/application/services/UserService'
import { DeleteUserService } from '../../core/application/useCases/deleteUser/DeleteUserService'
import { GetMeService } from '../../core/application/useCases/getMe/GetMeService'
import { GetUserService } from '../../core/application/useCases/getUser/GetUserService'
import { LoginUserService } from '../../core/application/useCases/loginUser/LoginUserService'
import { RegisterUserService } from '../../core/application/useCases/registerUser/RegisterUserService'
import { UpdateUserService } from '../../core/application/useCases/updateUser/UpdateUserService'
import { TypeOrmUserRepositoryAdapter } from '../../infrastructure/persistence/TypeOrmUserRepositoryAdapter'
import { UserCommandQueryAdapter } from '../../presentation/controllers/UserCommandQueryAdapter'
import { UserDITokens } from '../UserDITokens'
import { AuthModule } from './AuthModule'
import { TypeOrmUser } from '@codelab/backend'

export const persistenceProviders: Array<Provider> = [
  {
    provide: UserDITokens.UserRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmUserRepositoryAdapter),
    inject: [Connection],
  },
  {
    provide: UserDITokens.AppRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmAppRepositoryAdapter),
    inject: [Connection],
  },
  UserCommandQueryAdapter,
]

export const useCaseProviders: Array<Provider> = [
  {
    provide: UserDITokens.UserService,
    useFactory: (usersRepository) => new UserService(usersRepository),
    inject: [UserDITokens.UserRepository],
  },
  {
    provide: UserDITokens.GetMeUseCase,
    useFactory: (usersRepository) => new GetMeService(usersRepository),
    inject: [UserDITokens.UserRepository],
  },
  {
    provide: UserDITokens.LoginUserUseCase,
    useFactory: (usersRepository, moduleRef) =>
      new LoginUserService(usersRepository, moduleRef),
    inject: [UserDITokens.UserRepository, ModuleRef],
  },
  {
    provide: UserDITokens.RegisterUserUseCase,
    useFactory: (usersRepository, moduleRef) =>
      new RegisterUserService(usersRepository, moduleRef),
    inject: [UserDITokens.UserRepository, ModuleRef],
  },
  {
    provide: UserDITokens.EditUserUseCase,
    useFactory: (userRepository) => new UpdateUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
  {
    provide: UserDITokens.DeleteUserUseCase,
    useFactory: (userRepository) => new DeleteUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
  {
    provide: UserDITokens.GetUserUseCase,
    useFactory: (userRepository) => new GetUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
]

export const handlerProviders: Array<Provider> = [
  GetMeQueryHandler,
  LoginUserQueryHandler,
  RegisterUserCommandHandler,
  DeleteUserCommandHandler,
  UpdateUserCommandHandler,
  GetUsersQueryHandler,
]

@Module({
  imports: [CqrsModule, AuthModule, TypeOrmModule.forFeature([TypeOrmUser])],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class UserModule {}
