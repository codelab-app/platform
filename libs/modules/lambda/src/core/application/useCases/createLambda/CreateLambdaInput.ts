import { Field, InputType } from '@nestjs/graphql'
import { Property } from '@tsed/schema'

@InputType()
export class CreateLambdaInput {
  @Field()
  @Property()
  declare name: string

  @Field()
  @Property()
  declare body: string

  @Field()
  @Property()
  declare appId: string
}
