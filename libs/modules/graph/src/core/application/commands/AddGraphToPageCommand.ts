import { Page } from '../../../../../page/src/core/domain/page'
import { UUID } from '@codelab/backend'

export class AddGraphToPageCommand {
  constructor(public readonly page: Page<UUID>) {}
}
