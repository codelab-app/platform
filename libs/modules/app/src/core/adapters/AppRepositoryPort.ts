import { Option } from 'fp-ts/Option'
import { Page } from '../../../../page/src/core/domain/page'
import { ByAppCondition, ByAppConditions } from '../../common/QueryConditions'
import { App } from '../domain/app'
import { NOID, UUID } from '@codelab/backend'
import { User } from '@codelab/modules/user'

export abstract class AppRepositoryPort {
  abstract createApp(app: App<NOID>, user: User): Promise<App>

  abstract findSingle(app: ByAppCondition, userId: UUID): Promise<Option<App>>

  abstract findMany(apps: ByAppConditions, userId: UUID): Promise<Array<App>>

  abstract deleteApp(appId: string): Promise<Option<App>>

  abstract addPageToApp(app: App, page: Page): Promise<void>
}
