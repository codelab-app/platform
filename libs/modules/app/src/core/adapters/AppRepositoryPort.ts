import { Option } from 'fp-ts/Option'
import { Page } from '../../../../page/src/core/domain/page'
import { ByAppCondition, ByAppConditions } from '../../common/CommonTypes'
import { App } from '../domain/app'
import { NOID, UUID } from '@codelab/backend'
import { User } from '@codelab/modules/user'

export interface AppRepositoryPort {
  create(app: App<NOID>, user: User): Promise<App>
  find(apps: ByAppConditions, userId: UUID): Promise<Array<App>>
  deleteApp(appId: string): Promise<Option<App>>
  findOne(app: ByAppCondition): Promise<Option<App>>
  addPageToApp(app: App, page: Page): Promise<void>
}
