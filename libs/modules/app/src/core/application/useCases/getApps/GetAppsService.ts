import { right } from 'fp-ts/lib/Either'
import { AppRepositoryPort } from '../../../adapters/AppRepositoryPort'
import { GetAppsRequest } from './GetAppsRequest'
import { GetAppsResponse } from './GetAppsResponse'
import { GetAppsUseCase } from './GetAppsUseCase'
import { Result } from '@codelab/backend'

export class GetAppsService implements GetAppsUseCase {
  constructor(private readonly appRepository: AppRepositoryPort) {}

  async execute({ user }: GetAppsRequest): Promise<GetAppsResponse> {
    const apps = await this.appRepository.findApps({}, user.id)

    return right(Result.ok(apps))
  }
}
