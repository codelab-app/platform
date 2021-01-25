import { Option } from 'fp-ts/Option'
import { App } from '../domain/app'
import { AppDTO, AppVO } from '../domain/app.codec'
import { RepositoryPort } from '@codelab/backend'

export abstract class AppRepositoryPort implements RepositoryPort<App> {
  abstract create(app: AppVO, userId: string): Promise<Option<App>>

  abstract findOne(app: AppDTO, userId?: string): Promise<Option<App>>

  abstract findMany(apps: AppDTO, userId?: string): Promise<Array<App>>

  abstract update(where: AppDTO, data: AppDTO): Promise<Option<App>>

  abstract delete(app: AppDTO): Promise<Option<App>>

  // abstract addPageToApp(app: App, page: Page): Promise<void>
}
