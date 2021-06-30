import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class GetArrayValuesInput {
  @Field()
  declare arrayValueId: string
}
