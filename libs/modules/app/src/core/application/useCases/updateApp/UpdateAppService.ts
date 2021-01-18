import { option } from 'fp-ts'
import { left, right } from 'fp-ts/Either'
import { Option } from 'fp-ts/Option'
import { AppRepositoryPort } from '../../../adapters/AppRepositoryPort'
import { App } from '../../../domain/app'
import { UpdateAppErrors } from './UpdateAppErrors'
import { UpdateAppRequest } from './UpdateAppRequest'
import { UpdateAppResponse } from './UpdateAppResponse'
import { UpdateAppUseCase } from './UpdateAppUseCase'
import { AppError, Result } from '@codelab/backend'

export class UpdateAppService implements UpdateAppUseCase {
  constructor(private readonly appRepository: AppRepositoryPort) {}

  async execute({
    user,
    id,
    ...appData
  }: UpdateAppRequest): Promise<UpdateAppResponse> {
    const existingApp: Option<App> = await this.appRepository.findOne(
      {
        appId: id,
      },
      user.id,
    )

    if (option.isNone(existingApp)) {
      return left(new UpdateAppErrors.AppNotFoundError(id))
    }

    const result = await this.appRepository.update({ appId: id }, appData)

    if (option.isNone(result)) {
      return left(new AppError('Error while updating app'))
    }

    return right(Result.ok(result.value))
  }
}
