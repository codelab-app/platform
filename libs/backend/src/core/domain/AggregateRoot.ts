import { AggregateRoot as NestjsAggregateRoot } from '@nestjs/cqrs'
import { classToPlain } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { Option } from 'fp-ts/Option'
import { ValueObjectProps } from './ValueObject'
import { UUID } from './valueObject/UUID'

export class AggregateRoot<
  P extends ValueObjectProps
> extends NestjsAggregateRoot {
  @ValidateNested()
  declare id: Option<UUID>

  constructor(props: P) {
    super()
    Object.assign(this, props)
  }

  toPlain() {
    return classToPlain(this)
  }
}
