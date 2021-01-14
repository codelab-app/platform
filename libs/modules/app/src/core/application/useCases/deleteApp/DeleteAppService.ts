import { left, right } from 'fp-ts/Either'
import { Option, isNone } from 'fp-ts/Option'
import { AppRepositoryPort } from '../../../adapters/AppRepositoryPort'
import { App } from '../../../domain/app'
import { DeleteAppErrors } from './DeleteAppErrors'
import { DeleteAppRequest } from './DeleteAppRequest'
import { DeleteAppResponse } from './DeleteAppResponse'
import { DeleteAppUseCase } from './DeleteAppUseCase'
import { Result } from '@codelab/backend'

export class DeleteAppService implements DeleteAppUseCase {
  constructor(private readonly appRepository: AppRepositoryPort) {}

  async execute(request: DeleteAppRequest): Promise<DeleteAppResponse> {
    const { appId } = request

    const deleteAppResult: Option<App> = await this.appRepository.deleteApp(
      appId,
    )

    if (isNone(deleteAppResult)) {
      return left(new DeleteAppErrors.AppNotFoundError(appId))
    }

    return right(Result.ok(deleteAppResult.value))
  }
}
