import { isNone } from 'fp-ts/Option'
import { left, right } from 'fp-ts/lib/Either'
import { AppRepositoryPort } from '../../../adapters/AppRepositoryPort'
import { App } from '../../../domain/app'
import { CreateAppErrors } from './CreateAppErrors'
import { CreateAppRequest } from './CreateAppRequest'
import { CreateAppResponse } from './CreateAppResponse'
import { CreateAppUseCase } from './CreateAppUseCase'
import { Result } from '@codelab/backend'

export class CreateAppService implements CreateAppUseCase {
  constructor(private readonly appRepository: AppRepositoryPort) {}

  async execute(request: CreateAppRequest): Promise<CreateAppResponse> {
    const { user, title } = request
    const app = App.create({ title })

    if (isNone(user)) {
      return left(new CreateAppErrors.UserNotFoundError('User not found'))
    }

    const createdApp = await this.appRepository.createApp(app, user.value)

    return right(Result.ok(createdApp))
  }
}
