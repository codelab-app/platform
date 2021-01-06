import { isNone } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { UserRepositoryPort } from '../../../adapters/UserRepositoryPort'
import { GetMeErrors } from './GetMeErrors'
import { GetMeRequest } from './GetMeRequest'
import { GetMeResponse } from './GetMeResponse'
import { GetMeUseCase } from './GetMeUseCase'
import { Result } from '@codelab/backend'

export class GetMeService implements GetMeUseCase {
  constructor(private readonly usersRepository: UserRepositoryPort) {}

  async execute(request: GetMeRequest): Promise<GetMeResponse> {
    const { user } = request

    if (isNone(user)) {
      return left(new GetMeErrors.UserNotFoundError('User was not found'))
    }

    return right(Result.ok(user.value))
  }
}
