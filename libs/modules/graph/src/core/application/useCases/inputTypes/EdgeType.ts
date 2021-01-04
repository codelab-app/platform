import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class EdgeType {
  @Field()
  declare source: string

  @Field()
  declare target: string
}
