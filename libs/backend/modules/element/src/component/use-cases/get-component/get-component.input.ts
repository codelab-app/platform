import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetComponentInput {
  @Field()
  declare componentId: string
}
