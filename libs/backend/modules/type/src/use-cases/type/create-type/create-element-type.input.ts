import { ElementTypeKind } from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateElementTypeInput {
  @Field(() => ElementTypeKind)
  declare kind: ElementTypeKind
}
