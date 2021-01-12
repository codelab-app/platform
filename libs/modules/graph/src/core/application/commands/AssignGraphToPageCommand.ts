import { Page } from '../../../../../page/src/core/domain/page'
import { UUID } from '@codelab/backend'

export class AssignGraphToPageCommand {
  constructor(public readonly page: Page<UUID>) {}
}
