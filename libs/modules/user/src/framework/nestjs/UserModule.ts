import { Module, Provider } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { PrismaDITokens } from '../../../../../backend/src/infrastructure/persistence/prisma/PrismaDITokens'
import { DeleteUserCommandHandler } from '../../core/application/handlers/DeleteUserCommandHandler'
import { GetMeQueryHandler } from '../../core/application/handlers/GetMeQueryHandler'
import { GetUsersQueryHandler } from '../../core/application/handlers/GetUsersQueryHandler'
import { LoginUserCommandHandler } from '../../core/application/handlers/LoginUserCommandHandler'
import { RegisterUserCommandHandler } from '../../core/application/handlers/RegisterUserCommandHandler'
import { UpdateUserCommandHandler } from '../../core/application/handlers/UpdateUserCommandHandler'
import { ValidateUserCommandHandler } from '../../core/application/handlers/ValidateUserCommandHandler'
import { DeleteUserService } from '../../core/application/useCases/deleteUser/DeleteUserService'
import { GetMeService } from '../../core/application/useCases/getMe/GetMeService'
import { GetUserService } from '../../core/application/useCases/getUser/GetUserService'
import { LoginUserService } from '../../core/application/useCases/loginUser/LoginUserService'
import { RegisterUserService } from '../../core/application/useCases/registerUser/RegisterUserService'
import { UpdateUserService } from '../../core/application/useCases/updateUser/UpdateUserService'
import { ValidateUserService } from '../../core/application/useCases/validateUser/ValidateUserService'
import { PrismaUserRepositoryAdapter } from '../../infrastructure/persistence/PrismaUserRepositoryAdapter'
import { UserCommandQueryAdapter } from '../../presentation/controllers/UserCommandQueryAdapter'
import { UserDITokens } from '../UserDITokens'
import { AuthModule } from './AuthModule'
import { GqlAuthGuard } from '@codelab/backend'

export const persistenceProviders: Array<Provider> = [
  {
    provide: UserDITokens.UserRepository,
    useFactory: (prismaService) =>
      new PrismaUserRepositoryAdapter(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  UserCommandQueryAdapter,
]

export const useCaseProviders: Array<Provider> = [
  {
    provide: UserDITokens.ValidateUserUseCase,
    useFactory: (userRepository) => new ValidateUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
  {
    provide: UserDITokens.GetMeUseCase,
    useFactory: () => new GetMeService(),
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
  ValidateUserCommandHandler,
  LoginUserCommandHandler,
  RegisterUserCommandHandler,
  DeleteUserCommandHandler,
  UpdateUserCommandHandler,
  GetUsersQueryHandler,
]

@Module({
  imports: [CqrsModule, AuthModule],
  providers: [
    GqlAuthGuard,
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
  exports: [GqlAuthGuard],
})
export class UserModule {}
