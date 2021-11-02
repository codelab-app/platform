import { Maybe } from '@codelab/shared/abstract/types'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateEnumTypeValueInput {
  @Field(() => String, { nullable: true })
  declare name?: Maybe<string>

  @Field()
  declare value: string
}
