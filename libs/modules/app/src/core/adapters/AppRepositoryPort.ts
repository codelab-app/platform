import { AppsWhere } from '../../common/CommonTypes'
import { App } from '../domain/app'
import { UUID } from '@codelab/backend'
import { User } from '@codelab/modules/user'

export interface AppRepositoryPort {
  createApp(app: App, user: User): Promise<App>
  findApps(by: AppsWhere, userId: UUID): Promise<Array<App>>
}
