import { Module, Provider } from '@nestjs/common'
import { PrismaDITokens } from '../../../../../backend/src/infrastructure/persistence/prisma/PrismaDITokens'
import { ValidateUserCommandHandler } from '../../core/application/handlers/ValidateUserCommandHandler'
import { AuthService } from '../../core/application/services/AuthService'
import { DeleteUserService } from '../../core/application/useCases/deleteUser/DeleteUserService'
import { LoginUserService } from '../../core/application/useCases/loginUser/LoginUserService'
import { RegisterUserService } from '../../core/application/useCases/registerUser/RegisterUserService'
import { UpdateUserService } from '../../core/application/useCases/updateUser/UpdateUserService'
import { ValidateUserService } from '../../core/application/useCases/validateUser/ValidateUserService'
import { UserGraphqlAdapter } from '../../presentation/controllers/UserGraphqlAdapter'
import { UserDITokens } from '../UserDITokens'
import { AuthModule } from './AuthModule'
import { GqlAuthGuard } from '@codelab/backend'

export const persistenceProviders: Array<Provider> = [UserGraphqlAdapter]

export const useCaseProviders: Array<Provider> = [
  {
    provide: UserDITokens.ValidateUserUseCase,
    useFactory: (prismaService) => new ValidateUserService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: UserDITokens.LoginUserUseCase,
    useFactory: (prismaService, authService) =>
      new LoginUserService(prismaService, authService),
    inject: [PrismaDITokens.PrismaService, AuthService],
  },
  {
    provide: UserDITokens.RegisterUserUseCase,
    useFactory: (prismaService, authService) =>
      new RegisterUserService(prismaService, authService),
    inject: [PrismaDITokens.PrismaService, AuthService],
  },
  {
    provide: UserDITokens.UpdateUserUseCase,
    useFactory: (prismaService) => new UpdateUserService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
  {
    provide: UserDITokens.DeleteUserUseCase,
    useFactory: (prismaService) => new DeleteUserService(prismaService),
    inject: [PrismaDITokens.PrismaService],
  },
]

export const handlerProviders: Array<Provider> = [ValidateUserCommandHandler]

@Module({
  imports: [AuthModule],
  providers: [
    GqlAuthGuard,
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
  exports: [GqlAuthGuard],
})
export class UserModule {}
