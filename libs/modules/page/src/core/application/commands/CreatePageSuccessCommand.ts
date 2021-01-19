import { PageDto } from '../../../presentation/PageDto'

export class CreatePageSuccessCommand {
  constructor(public readonly page: PageDto) {}
}
