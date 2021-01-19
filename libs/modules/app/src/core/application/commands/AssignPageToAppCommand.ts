import { SerializedPageDto } from '../../../../../page/src/core/domain/dto/SerializedPageDto'
import { SerializedAppDto } from '../../domain/dto/SerializedAppDto'

export class AssignPageToAppCommand {
  constructor(
    public readonly app: SerializedAppDto,
    public readonly page: SerializedPageDto,
  ) {}
}
