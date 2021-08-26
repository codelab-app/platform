import { TypeKind } from '@codelab/shared/abstract/core'
import { Field, InputType } from '@nestjs/graphql'
import { CreateArrayTypeInput } from './create-array-type.input'
import { CreateElementTypeInput } from './create-element-type.input'
import { CreateEnumTypeInput } from './create-enum-type.input'
import { CreatePrimitiveTypeInput } from './create-primitive-type.input'

/**
 * This is a workaround for the lack of GraphQL union input types as described here https://github.com/graphql/graphql-spec/issues/488
 *
 * https://github.com/graphql/graphql-spec/blob/main/rfcs/InputUnion.md maybe we'll see it soon
 */
@InputType({ description: 'Provide one of the properties' })

// The generic is a quick workaround for a circular reference to CreateArrayTypeInput
export class CreateTypeInput<T = CreateArrayTypeInput> {
  @Field()
  declare name: string

  @Field(() => TypeKind)
  declare typeKind: TypeKind

  @Field(() => CreatePrimitiveTypeInput, { nullable: true })
  declare primitiveType?: CreatePrimitiveTypeInput

  @Field(() => CreateArrayTypeInput, { nullable: true })
  declare arrayType?: T

  @Field(() => CreateEnumTypeInput, { nullable: true })
  declare enumType?: CreateEnumTypeInput

  // @Field(() => CreateInterfaceTypeInput, { nullable: true })
  // declare interfaceType?: CreateInterfaceTypeInput
  //
  // @Field(() => CreateLambdaTypeInput, { nullable: true })
  // declare lambdaType?: CreateLambdaTypeInput
  //
  // @Field(() => CreateComponentTypeInput, { nullable: true })
  // declare componentType?: CreateComponentTypeInput

  @Field(() => CreateElementTypeInput, { nullable: true })
  declare elementType?: CreateElementTypeInput
}
