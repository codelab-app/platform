import { AtomType } from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AddHookToElementInput {
  @Field()
  declare elementId: string

  @Field({ description: 'JSON string' })
  declare config: string

  @Field(() => AtomType)
  declare type: AtomType
}
