import { Page } from '../../../../../page/src/core/domain/page'
import { App } from '../../domain/app'

export class AssignPageToAppCommand {
  constructor(public readonly app: App, public readonly page: Page) {}
}
