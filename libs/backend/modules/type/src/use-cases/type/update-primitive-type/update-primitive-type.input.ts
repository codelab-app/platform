import { PrimitiveKind } from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdatePrimitiveKindData {
  @Field(() => PrimitiveKind)
  declare primitiveKind: PrimitiveKind

  @Field()
  declare name: string

  @Field(() => [String], { nullable: true })
  declare tagIds?: Array<string>
}

@InputType()
export class UpdatePrimitiveTypeInput {
  @Field()
  declare typeId: string

  @Field(() => UpdatePrimitiveKindData)
  declare updateData: UpdatePrimitiveKindData
}
