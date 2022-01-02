import { Nullable } from '@codelab/shared/abstract/types'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateEnumTypeValueInput {
  @Field(() => String, { nullable: true })
  declare name?: Nullable<string>

  @Field()
  declare value: string
}
