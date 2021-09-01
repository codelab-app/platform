import { ElementTypeKind } from '@codelab/shared/enums'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateElementTypeInput {
  @Field(() => ElementTypeKind)
  declare kind: ElementTypeKind
}
