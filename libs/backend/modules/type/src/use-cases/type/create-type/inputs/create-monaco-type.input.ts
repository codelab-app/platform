import { MonacoLanguage } from '@codelab/shared/abstract/codegen-v2'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateMonacoTypeInput {
  @Field(() => MonacoLanguage)
  declare language: MonacoLanguage
}
