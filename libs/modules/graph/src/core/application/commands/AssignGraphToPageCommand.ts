import { PageDto } from '../../../../../page/src/presentation/PageDto'

export class AssignGraphToPageCommand {
  constructor(public readonly page: PageDto) {}
}
