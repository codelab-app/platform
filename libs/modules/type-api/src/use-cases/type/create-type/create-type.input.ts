import { Field, InputType } from '@nestjs/graphql'
import { PrimitiveType } from '../../../models/types'

// It would be nice if we could do union input types, but graphql doesn't support it right now
// there's an RFC though https://github.com/graphql/graphql-spec/blob/main/rfcs/InputUnion.md maybe we'll see it soon

@InputType()
export class CreateSimpleTypeInput {
  @Field(() => PrimitiveType)
  declare primitiveType: PrimitiveType
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
  @Field()
  declare value: string

  @Field(() => [CreateEnumTypeValueInput])
  declare allowedValues: Array<CreateEnumTypeValueInput>
}

@InputType()
export class CreateArrayTypeInput {
  @Field()
  declare itemTypeId: string
}

@InputType({ description: 'Provide one of the properties' })
// The generic is a quick workaround for a circular reference to CreateArrayTypeInput
export class CreateTypeInput<T = CreateArrayTypeInput> {
  @Field()
  declare name: string

  @Field(() => CreateSimpleTypeInput, { nullable: true })
  declare simpleType?: CreateSimpleTypeInput

  @Field(() => CreateArrayTypeInput, { nullable: true })
  declare arrayType?: T

  @Field(() => CreateEnumTypeInput, { nullable: true })
  declare enumType?: CreateEnumTypeInput
}
