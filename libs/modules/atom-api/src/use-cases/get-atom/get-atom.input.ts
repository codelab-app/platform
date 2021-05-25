import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetAtomInput {
  @Field()
  declare atomId: string
}
