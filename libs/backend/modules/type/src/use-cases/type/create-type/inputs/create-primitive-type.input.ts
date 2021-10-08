import { PrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreatePrimitiveTypeInput {
  @Field(() => PrimitiveTypeKind)
  declare primitiveKind: PrimitiveTypeKind
}
