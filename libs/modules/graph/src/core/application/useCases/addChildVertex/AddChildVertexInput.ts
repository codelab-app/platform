import { Field, InputType } from '@nestjs/graphql'
import { Property } from '@tsed/schema'
import { CreateVertexInput } from '../createVertex/CreateVertexInput'

@InputType()
export class AddChildVertexInput {
  @Field(() => String, { nullable: true })
  declare parentVertexId: string

  @Field(() => CreateVertexInput)
  @Property(CreateVertexInput)
  declare vertex: CreateVertexInput

  @Field({ nullable: true })
  declare order?: number

  // @Field(() => GraphQLJSONObject, { nullable: true })
  // declare props?: object
}
