import { MonacoLanguage } from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateMonacoTypeInput {
  @Field(() => MonacoLanguage)
  declare language: MonacoLanguage
}
