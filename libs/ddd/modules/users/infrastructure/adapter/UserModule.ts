import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { CreateUserCommandHandler } from '../../core/application/handlers/CreateUserCommandHandler'
import { CreateUserService } from '../../core/application/services/CreateUserService'
import { UserController } from '../../presentation/controllers/UserController'
import { UserResolver } from '../../presentation/controllers/UserResolver'
import { TypeOrmUserRepositoryAdapter } from '../persistence/TypeOrmUserRepositoryAdapter'
import { UserDITokens } from './UserDITokens'
import { TypeOrmUser } from '@codelab/ddd/shared/infrastructure'

export const persistenceProviders: Array<Provider> = [
  {
    provide: UserDITokens.UserRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmUserRepositoryAdapter),
    inject: [Connection],
  },
  UserResolver,
]

export const useCaseProviders: Array<Provider> = [
  {
    provide: UserDITokens.CreateUserUseCase,
    useFactory: (userRepository) => new CreateUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
]

export const handlerProviders: Array<Provider> = [CreateUserCommandHandler]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([TypeOrmUser])],
  controllers: [UserController],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class UserModule {}
