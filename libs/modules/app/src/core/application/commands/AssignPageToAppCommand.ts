import { SerializedPageDto } from '../../../../../page/src/core/domain/dto/SerializedPageDto'
import { SerializedAppDto } from '../../../../../user/src/core/domain/dto/SerializedAppDto'

export class AssignPageToAppCommand {
  // constructor(public readonly app: App, public readonly page: Page) {}
  constructor(
    public readonly app: SerializedAppDto,
    public readonly page: SerializedPageDto,
  ) {}
}
