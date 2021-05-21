import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeleteAtomInput {
  @Field()
  declare atomId: string
}
