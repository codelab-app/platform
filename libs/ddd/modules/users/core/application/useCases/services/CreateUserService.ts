import { UserUseCaseDto } from '../UserUseCaseDto'
import { CreateUserRequest } from '../createUser/CreateUserRequest'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'

export class CreateUserService implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  execute(request?: CreateUserRequest): Promise<UserUseCaseDto> {
    throw new Error('Method not implemented.')
  }
}
