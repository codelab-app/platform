import { PageDto } from '../../../../../page/src/presentation/PageDto'
import { AppDto } from '../useCases/AppDto'

export class AssignPageToAppCommand {
  constructor(public readonly app: AppDto, public readonly page: PageDto) {}
}
