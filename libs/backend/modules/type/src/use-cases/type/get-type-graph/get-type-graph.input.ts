import { Field, InputType } from '@nestjs/graphql'
import { WhereUniqueType } from '../get-type'

@InputType()
export class GetTypeGraphInput {
  @Field(() => WhereUniqueType)
  declare where: WhereUniqueType
}
