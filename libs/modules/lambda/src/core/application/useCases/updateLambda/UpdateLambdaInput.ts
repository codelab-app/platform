import { Field, InputType } from '@nestjs/graphql'
import { Property } from '@tsed/schema'

@InputType()
export class UpdateLambdaInput {
  @Field()
  @Property()
  declare lambdaId: string

  @Field()
  @Property()
  declare name: string

  @Field()
  @Property()
  declare body: string
}
