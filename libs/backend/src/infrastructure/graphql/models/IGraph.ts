import { Field, InterfaceType } from '@nestjs/graphql'
import { TypeOrmEdge } from '../../persistence/typeorm/entity/TypeOrmEdge'
import { TypeOrmUser } from '../../persistence/typeorm/entity/TypeOrmUser'
import { TypeOrmVertex } from '../../persistence/typeorm/entity/TypeOrmVertex'

@InterfaceType()
export abstract class IGraph {
  @Field()
  declare id: string

  @Field(() => [TypeOrmVertex], { nullable: true })
  declare vertices: Array<TypeOrmVertex>

  @Field(() => [TypeOrmEdge], { nullable: true })
  declare edges: Array<TypeOrmEdge>

  @Field(() => TypeOrmUser, { nullable: true })
  declare user: TypeOrmUser
}
