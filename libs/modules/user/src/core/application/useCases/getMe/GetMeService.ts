import { right } from 'fp-ts/lib/Either'
import { UserRepositoryPort } from '../../../adapters/UserRepositoryPort'
import { GetMeRequest } from './GetMeRequest'
import { GetMeResponse } from './GetMeResponse'
import { GetMeUseCase } from './GetMeUseCase'
import { Result } from '@codelab/backend'

export class GetMeService implements GetMeUseCase {
  constructor(private readonly usersRepository: UserRepositoryPort) {}

  async execute(request: GetMeRequest): Promise<GetMeResponse> {
    const { user } = request

    return right(Result.ok(user))
  }
}
