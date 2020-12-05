import { Module, Provider } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { CreateUserCommandHandler } from '../../core/application/handlers/CreateUserCommandHandler'
import { CreateUserService } from '../../core/application/services/CreateUserService'
import { UserResolver } from '../../presentation/controllers/UserResolver'
import { TypeOrmUserRepositoryAdapter } from '../persistence/TypeOrmUserRepositoryAdapter'
import { UserDITokens } from './UserDITokens'
import { TypeOrmUser } from '@codelab/ddd/shared/infrastructure'

const persistenceProviders: Array<Provider> = [
  {
    provide: UserDITokens.UserRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmUserRepositoryAdapter),
    inject: [Connection],
  },
  UserResolver,
]

const useCaseProviders: Array<Provider> = [
  {
    provide: UserDITokens.CreateUserUseCase,
    useFactory: (userRepository) => new CreateUserService(userRepository),
    inject: [UserDITokens.UserRepository],
  },
]

const handlerProviders: Array<Provider> = [CreateUserCommandHandler]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([TypeOrmUser])],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class UserModule {}
