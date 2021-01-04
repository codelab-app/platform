import { Option, isNone } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { UserRepositoryPort } from '../../../adapters/UserRepositoryPort'
import { User } from '../../../domain/user'
import { GetMeErrors } from './GetMeErrors'
import { GetMeRequest } from './GetMeRequest'
import { GetMeResponse } from './GetMeResponse'
import { GetMeUseCase } from './GetMeUseCase'
import { Result } from '@codelab/backend'

export class GetMeService implements GetMeUseCase {
  constructor(private readonly usersRepository: UserRepositoryPort) {}

  async execute(request: GetMeRequest): Promise<GetMeResponse> {
    const { userId } = request

    const user: Option<User> = await this.usersRepository.findUser({
      id: userId,
    })

    if (isNone(user)) {
      return left(new GetMeErrors.UserNotFoundError(userId))
    }

    return right(Result.ok(user.value))
  }
}
