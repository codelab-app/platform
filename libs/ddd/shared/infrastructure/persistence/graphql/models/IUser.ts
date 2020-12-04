import { Field, InterfaceType } from '@nestjs/graphql'
import { TypeOrmGraph } from '../../typeorm/entity/TypeOrmGraph'

@InterfaceType()
export abstract class IUser {
  @Field()
  declare id: string

  @Field({ nullable: false })
  declare email: string

  @Field((returns) => [TypeOrmGraph])
  declare graphs: Array<TypeOrmGraph>
}
