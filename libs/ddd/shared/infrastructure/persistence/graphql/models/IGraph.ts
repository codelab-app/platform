import { Field, InterfaceType } from '@nestjs/graphql'
import { TypeOrmEdge } from '../../typeorm/entity/TypeOrmEdge'
import { TypeOrmUser } from '../../typeorm/entity/TypeOrmUser'
import { TypeOrmVertex } from '../../typeorm/entity/TypeOrmVertex'

@InterfaceType()
export abstract class IGraph {
  @Field()
  declare id: string

  @Field((returns) => [TypeOrmVertex], { nullable: true })
  declare vertices: Array<TypeOrmVertex>

  @Field((returns) => [TypeOrmEdge], { nullable: true })
  declare edges: Array<TypeOrmEdge>

  @Field((returns) => TypeOrmUser, { nullable: true })
  declare user: TypeOrmUser
}
