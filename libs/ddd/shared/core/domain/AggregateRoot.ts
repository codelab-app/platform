import { AggregateRoot as NestjsAggregateRoot } from '@nestjs/cqrs'
import { ValidateNested } from 'class-validator'
import { Option } from 'fp-ts/Option'
import { UUID } from './valueObject/UUID'

export class AggregateRoot<P> extends NestjsAggregateRoot {
  @ValidateNested()
  protected declare id: Option<UUID>

  constructor(props: P) {
    super()
    Object.assign(this, props)
  }
}
