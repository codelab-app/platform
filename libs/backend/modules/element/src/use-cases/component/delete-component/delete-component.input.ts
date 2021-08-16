import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteComponentInput {
  @Field()
  declare componentId: string
}
