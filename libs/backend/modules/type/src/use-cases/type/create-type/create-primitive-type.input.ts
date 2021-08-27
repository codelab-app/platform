import { PrimitiveKind } from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreatePrimitiveTypeInput {
  @Field(() => PrimitiveKind)
  declare primitiveKind: PrimitiveKind
}
