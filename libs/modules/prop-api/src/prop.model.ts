import { Field } from '@codelab/modules/type-api'
import {
  createUnionType,
  Field as GraphqlField,
  Float,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql'

@ObjectType()
export class StringValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField()
  declare value: string
}

@ObjectType()
export class IntValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField(() => Int)
  declare value: number
}

@ObjectType()
export class FloatValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField(() => Float)
  declare value: number
}

@ObjectType()
export class BooleanValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField()
  declare value: boolean
}

@ObjectType()
export class ArrayValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField(() => [PropValue])
  declare values: Array<typeof PropValue>
}

@ObjectType()
export class InterfaceValue {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField(() => [Prop])
  declare props: Array<typeof Prop>
}

export const PropValue = createUnionType({
  name: 'PropValue',
  types: () => [
    StringValue,
    IntValue,
    FloatValue,
    BooleanValue,
    ArrayValue,
    InterfaceValue,
  ],
})

@ObjectType()
export class Prop {
  @GraphqlField(() => ID)
  declare id: string

  @GraphqlField(() => Field)
  declare field: Field

  @GraphqlField(() => PropValue, { nullable: true })
  declare value?: typeof PropValue
}
