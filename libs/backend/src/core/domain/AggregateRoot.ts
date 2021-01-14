import { AggregateRoot as NestjsAggregateRoot } from '@nestjs/cqrs'
import { Type, classToPlain } from 'class-transformer'
import { TransformBoth } from '../../common/TransformBoth'
import { BaseTypeOrm } from '../../infrastructure/persistence/typeorm/entity/BaseTypeOrm'
import { ValueObjectProps } from './ValueObject'
import { NOID } from './valueObject/NOID'
import { UUID } from './valueObject/UUID'

export abstract class AggregateRoot<
  P extends ValueObjectProps = ValueObjectProps,
  ID extends UUID | NOID = UUID
> extends NestjsAggregateRoot {
  @Type(() => UUID)
  @TransformBoth(UUID)
  declare id: ID

  constructor(props: P) {
    super()
    Object.assign(this, props)
  }

  toPlain() {
    return classToPlain(this)
  }

  abstract toPersistence(): BaseTypeOrm

  /**
   * @typeparam T Domain class of model
   * @typeparam M TypeOrm class of model
   *
   * @param this Domain class
   * @param typeOrmModel
   */
  // static hydrate<T, Props extends ValueObjectProps>(
  //   this: new (props: Props) => T,
  //   props: Props,
  // ): T {
  //   const { id, ...restProps } = props

  //   if (id === undefined) {
  //     return plainToClass(this, restProps)
  //   }

  //   return plainToClass(this, props)
  // }
}
