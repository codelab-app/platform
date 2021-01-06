import { right } from 'fp-ts/lib/Either'
import { AppRepositoryPort } from '../../../adapters/AppRepositoryPort'
import { GetAppsRequest } from './GetAppsRequest'
import { GetAppsResponse } from './GetAppsResponse'
import { GetAppsUseCase } from './GetAppsUseCase'
import { Result, UUID } from '@codelab/backend'

export class GetAppsService implements GetAppsUseCase {
  constructor(private readonly appRepository: AppRepositoryPort) {}

  async execute({ userId }: GetAppsRequest): Promise<GetAppsResponse> {
    const apps = await this.appRepository.findApps(
      {},
      new UUID({ value: userId }),
    )

    return right(Result.ok(apps))

    // const app = App.create(request)

    // const appAlreadyExists = await this.appRepository.exists({
    //   email: user.email.toString(),
    // })

    // if (appAlreadyExists) {
    //   return left(
    //     new GetAppsErrors.DemoError('some error'),
    //   )
    // }

    // const persistedApp = await this.appRepository.GetApps(app)

    // return right(Result.ok(persistedApp))
  }
}
