import { Page } from '../../../../../page/src/core/domain/page'

export class AddGraphToPageCommand {
  constructor(public readonly page: Page) {}
}
