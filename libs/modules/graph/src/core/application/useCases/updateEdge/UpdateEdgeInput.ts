import { Field, InputType } from '@nestjs/graphql'
import { EdgeType } from '@prisma/client'

@InputType()
export class UpdateEdgeInput {
  @Field()
  declare id: string

  @Field()
  declare order?: number

  @Field(() => String)
  declare type?: EdgeType

  @Field()
  declare source?: string

  @Field()
  declare target?: string
}
