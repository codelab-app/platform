import { CreateElementChildInput } from '@codelab/backend/modules/element'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreatePageInput {
  @Field()
  declare name: string

  @Field()
  declare appId: string

  @Field(() => CreateElementChildInput, { nullable: true })
  declare rootElement?: CreateElementChildInput
}
