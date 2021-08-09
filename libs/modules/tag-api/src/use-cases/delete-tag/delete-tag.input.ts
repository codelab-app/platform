import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteTagInput {
  @Field()
  declare id: string
}
