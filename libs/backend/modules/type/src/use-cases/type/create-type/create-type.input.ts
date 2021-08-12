import { PrimitiveKind } from '@codelab/backend/infra'
import { Field, InputType } from '@nestjs/graphql'
import { ElementTypeKind } from '../../../models'

// It would be nice if we could do union input types, but graphql doesn't support it right now
// there's an RFC though https://github.com/graphql/graphql-spec/blob/main/rfcs/InputUnion.md maybe we'll see it soon

@InputType()
export class CreatePrimitiveTypeInput {
  @Field(() => PrimitiveKind)
  declare primitiveKind: PrimitiveKind
}

@InputType()
export class CreateEnumTypeValueInput {
  @Field(() => String, { nullable: true })
  declare name?: string

  @Field()
  declare value: string
}

@InputType()
export class CreateEnumTypeInput {
  @Field(() => [CreateEnumTypeValueInput])
  declare allowedValues: Array<CreateEnumTypeValueInput>
}

@InputType()
export class CreateArrayTypeInput {
  @Field()
  declare itemTypeId: string
}

@InputType()
export class CreateElementTypeInput {
  @Field(() => ElementTypeKind)
  declare kind: ElementTypeKind
}

@InputType({ description: 'Provide one of the properties' })
// The generic is a quick workaround for a circular reference to CreateArrayTypeInput
export class CreateTypeInput<T = CreateArrayTypeInput> {
  @Field()
  declare name: string

  @Field(() => CreatePrimitiveTypeInput, { nullable: true })
  declare primitiveType?: CreatePrimitiveTypeInput

  @Field(() => CreateArrayTypeInput, { nullable: true })
  declare arrayType?: T

  @Field(() => CreateEnumTypeInput, { nullable: true })
  declare enumType?: CreateEnumTypeInput

  @Field(() => Boolean, { nullable: true })
  declare interfaceType?: boolean

  @Field(() => Boolean, { nullable: true })
  declare lambdaType?: boolean

  @Field(() => CreateElementTypeInput, { nullable: true })
  declare elementType?: CreateElementTypeInput
}
