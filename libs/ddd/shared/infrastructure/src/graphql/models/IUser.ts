import { Field, InterfaceType } from '@nestjs/graphql'
import { GraphEntity } from '../../database/typeorm/models/Graph'

@InterfaceType()
export abstract class IUser {
  @Field()
  declare id: string

  @Field({ nullable: false })
  declare email: string

  @Field((returns) => [GraphEntity])
  declare graphs: Array<GraphEntity>
}
