import { AppsWhere } from '../../common/CommonTypes'
import { Option } from 'fp-ts/Option'
import { Page } from '../../../../page/src/core/domain/page'
import { FindAppBy } from '../../common/CommonTypes'
import { App } from '../domain/app'
import { UUID } from '@codelab/backend'
import { User } from '@codelab/modules/user'

export interface AppRepositoryPort {
  createApp(app: App, user: User): Promise<App>
  findApps(by: AppsWhere, userId: UUID): Promise<Array<App>>
  deleteApp(appId: string): Promise<Option<App>>
  findApp(by: FindAppBy): Promise<Option<App>>
  addPageToApp(app: App, page: Page): Promise<void>
}
