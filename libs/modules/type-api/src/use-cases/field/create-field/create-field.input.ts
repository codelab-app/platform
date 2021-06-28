import { Field, InputType } from '@nestjs/graphql'
import { PrimitiveType, Unit } from '../../../models'

// It would be nice if we could do union input types, but graphql doesn't support it right now
// there's an RFC though https://github.com/graphql/graphql-spec/blob/main/rfcs/InputUnion.md maybe we'll see it soon

//
// Type inputs
//
@InputType()
export class CreateSimpleTypeInput {
  @Field(() => PrimitiveType)
  declare primitiveType: PrimitiveType
}

@InputType()
export class CreateInterfaceTypeInput {
  @Field()
  declare interfaceId: string
}

@InputType()
export class CreateEnumTypeInput {
  @Field(() => [String])
  declare allowedValues: Array<string>
}

@InputType()
export class CreateUnitTypeInput {
  @Field(() => [Unit], {
    nullable: true,
    description: 'Pass null to allow all',
  })
  declare allowedUnits?: Array<Unit> | null
}

@InputType({ description: 'Provide one of the properties' })
// The generic is a quick workaround for a circular reference to CreateArrayTypeInput
export class CreateTypeInput<T = CreateArrayTypeInput> {
  @Field(() => CreateSimpleTypeInput, { nullable: true })
  declare simpleType?: CreateSimpleTypeInput

  @Field(() => CreateInterfaceTypeInput, { nullable: true })
  declare interfaceType?: CreateInterfaceTypeInput

  @Field(() => CreateArrayTypeInput, { nullable: true })
  declare arrayType?: T

  @Field(() => CreateEnumTypeInput, { nullable: true })
  declare enumType?: CreateEnumTypeInput

  @Field(() => CreateUnitTypeInput, { nullable: true })
  declare unitType?: CreateUnitTypeInput
}

@InputType()
export class CreateArrayTypeInput {
  @Field()
  declare type: CreateTypeInput
}

@InputType()
export class CreateFieldInput {
  @Field()
  declare key: string

  @Field()
  declare name: string

  @Field(() => String, { nullable: true })
  declare description?: string | null

  @Field()
  declare interfaceId: string

  @Field(() => CreateTypeInput)
  declare type: CreateTypeInput

  // @Field(() => [CreateDecoratorInput])  TODO Field Decorators
  // declare decorators: Array<CreateDecoratorInput>
}
