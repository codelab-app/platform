import { ElementGraph } from '@codelab/backend/modules/element'
import { IPage } from '@codelab/shared/abstract/core'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Page implements IPage {
  @Field(() => ID)
  declare id: string

  @Field()
  declare name: string

  @Field(() => ElementGraph)
  /** Optional because it can be resolved with a FieldResolver */
  declare elements?: ElementGraph

  @Field(() => String)
  declare rootElementId: string
}
