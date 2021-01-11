import { Option } from 'fp-ts/Option'
import { RepositoryPort } from '../../../../../backend/src/infrastructure/persistence/RepositoryPort'
import { Page } from '../../../../page/src/core/domain/page'
import { ByAppCondition, ByAppConditions } from '../../common/QueryConditions'
import { App } from '../domain/app'
import { NOID, UUID } from '@codelab/backend'
import { User } from '@codelab/modules/user'

export abstract class AppRepositoryPort implements RepositoryPort<App> {
  abstract create(app: App<NOID>, user: User): Promise<App>

  abstract findOne(app: ByAppCondition, userId: UUID): Promise<Option<App>>

  abstract findMany(apps: ByAppConditions, userId: UUID): Promise<Array<App>>

  abstract delete(appId: string): Promise<Option<App>>

  abstract addPageToApp(app: App, page: Page): Promise<void>
}
