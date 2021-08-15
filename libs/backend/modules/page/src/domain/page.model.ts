import { ElementGraph } from '@codelab/backend/modules/element'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Page {
  @Field(() => ID)
  declare id: string

  @Field()
  declare name: string

  @Field(() => ElementGraph)
  /** Optional because it can be resolved with a FieldResolver */
  declare elements?: ElementGraph

  constructor(id: string, name: string, elements?: ElementGraph) {
    this.id = id
    this.name = name
    this.elements = elements
  }
}
