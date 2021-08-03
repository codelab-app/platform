import { PrimitiveKind } from '@codelab/backend'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdatePrimitiveKindData {
  @Field(() => PrimitiveKind)
  declare primitiveKind: PrimitiveKind

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
