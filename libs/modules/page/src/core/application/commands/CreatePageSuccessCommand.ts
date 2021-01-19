import { SerializedPageDto } from '../../domain/dto/SerializedPageDto'

export class CreatePageSuccessCommand {
  constructor(public readonly page: SerializedPageDto) {}
}
