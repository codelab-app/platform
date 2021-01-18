import { Option } from 'fp-ts/Option'
import { Page } from '../../../../page/src/core/domain/page'
import { AppDto } from '../application/useCases/AppDto'
import { App } from '../domain/app'
import { NOID, RepositoryPort, UUID } from '@codelab/backend'
import { ByAppCondition, ByAppConditions } from '@codelab/modules/app'
import { User } from '@codelab/modules/user'

export abstract class AppRepositoryPort implements RepositoryPort<App> {
  abstract create(app: App<NOID>, user: User): Promise<App>

  abstract findOne(app: ByAppCondition, userId: UUID): Promise<Option<App>>

  abstract findMany(apps: ByAppConditions, userId: UUID): Promise<Array<App>>

  abstract update(
    user: ByAppCondition,
    data: Partial<AppDto>,
  ): Promise<Option<App>>

  abstract delete(appId: string): Promise<Option<App>>

  abstract addPageToApp(app: App, page: Page): Promise<void>
}
