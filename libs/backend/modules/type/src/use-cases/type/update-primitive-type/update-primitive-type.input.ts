import { PrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdatePrimitiveKindData {
  @Field(() => PrimitiveTypeKind)
  declare primitiveKind: PrimitiveTypeKind

  @Field()
  declare name: string
}

@InputType()
export class UpdatePrimitiveTypeInput {
  @Field()
  declare typeId: string

  @Field(() => UpdatePrimitiveKindData)
  declare updateData: UpdatePrimitiveKindData
}
