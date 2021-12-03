import { AtomType } from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'

@InputType({
  description: 'Provide exactly one of the config fields',
})
export class AddHookToElementInput {
  @Field()
  declare elementId: string

  @Field()
  declare config: string

  @Field(() => AtomType)
  declare type: AtomType
}
