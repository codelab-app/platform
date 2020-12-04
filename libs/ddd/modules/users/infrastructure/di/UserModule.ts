import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Connection } from 'typeorm'
import { CreateUserCommandHandler } from '../../core/application/handlers/CreateUserCommandHandler'
import { CreateUserService } from '../../core/application/services/CreateUserService'
import { TypeOrmUserRepositoryAdapter } from '../repository/TypeOrmUserRepositoryAdapter'
import { UserDITokens } from './UserDITokens'
import { TypeOrmUser } from '@codelab/ddd/shared/infrastructure'

const persistenceProviders: Array<Provider> = [
  {
    provide: UserDITokens.UserRepository,
    useFactory: (connection) =>
      connection.getCustomRepository(TypeOrmUserRepositoryAdapter),
    inject: [Connection],
  },
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
  imports: [TypeOrmModule.forFeature([TypeOrmUser])],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...handlerProviders,
  ],
})
export class UserModule {}
