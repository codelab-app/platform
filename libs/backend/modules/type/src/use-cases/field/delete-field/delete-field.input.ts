import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteFieldInput {
  @Field()
  declare fieldId: string
}
