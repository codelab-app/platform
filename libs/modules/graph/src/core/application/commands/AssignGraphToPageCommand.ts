import { SerializedPageDto } from '../../../../../page/src/core/domain/dto/SerializedPageDto'

export class AssignGraphToPageCommand {
  constructor(public readonly page: SerializedPageDto) {}
}
