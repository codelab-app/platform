import { left, right } from 'fp-ts/Either'
import { isNone } from 'fp-ts/Option'
import { AppRepositoryPort } from '../../../adapters/AppRepositoryPort'
import { App } from '../../../domain/app'
import { CreateAppErrors } from './CreateAppErrors'
import { CreateAppRequest } from './CreateAppRequest'
import { CreateAppResponse } from './CreateAppResponse'
import { CreateAppUseCase } from './CreateAppUseCase'
import { Result } from '@codelab/backend'

export class CreateAppService implements CreateAppUseCase {
  constructor(private readonly appRepository: AppRepositoryPort) {}

  async execute({ user, title }: CreateAppRequest): Promise<CreateAppResponse> {
    const app = App.create({ title })

    const createdApp = await this.appRepository.create(app, user.id)

    if (isNone(createdApp)) {
      return left(new CreateAppErrors.UserNotFoundError())
    }

    return right(Result.ok(createdApp.value))
  }
}
