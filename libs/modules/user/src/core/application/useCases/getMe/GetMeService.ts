import { right } from 'fp-ts/Either'
import { GetMeRequest } from './GetMeRequest'
import { GetMeResponse } from './GetMeResponse'
import { GetMeUseCase } from './GetMeUseCase'
import { Result } from '@codelab/backend'

export class GetMeService implements GetMeUseCase {
  async execute(request: GetMeRequest): Promise<GetMeResponse> {
    const { user } = request

    return right(Result.ok(user))
  }
}
