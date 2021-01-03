import { User } from '../../../../users/src/core/domain/user'
import { App } from '../domain/app'

export interface AppRepositoryPort {
  createApp(app: App, user: User): Promise<App>
}
