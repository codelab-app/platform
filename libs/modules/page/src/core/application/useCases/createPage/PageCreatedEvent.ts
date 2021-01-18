import { SerializedAppDto } from '../../../../../../user/src/core/domain/dto/SerializedAppDto'
import { SerializedPageDto } from '../../../domain/dto/SerializedPageDto'
import { ICodelabEvent } from '@codelab/backend'

export class PageCreatedEvent implements ICodelabEvent {
  metadata: any

  constructor(
    public readonly app: SerializedAppDto,
    public readonly page: SerializedPageDto,
  ) {
    this.metadata = {
      id: 'some_id',
    }
  }
}
