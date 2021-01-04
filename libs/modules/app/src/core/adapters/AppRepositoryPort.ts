import { App } from '../domain/app'
import { User } from '@codelab/modules/user'

export interface AppRepositoryPort {
  createApp(app: App, user: User): Promise<App>
}
