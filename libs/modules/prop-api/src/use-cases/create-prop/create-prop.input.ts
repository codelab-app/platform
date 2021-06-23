import { Field, Float, InputType, Int } from '@nestjs/graphql'

@InputType()
export class StringValueInput {
  @Field()
  declare value: string
}

@InputType()
export class IntValueInput {
  @Field(() => Int)
  declare value: number
}

@InputType()
export class FloatValueInput {
  @Field(() => Float)
  declare value: number
}

@InputType()
export class BoleanValueInput {
  @Field()
  declare value: boolean
}

@InputType()
export class ArrayValueInput {
  @Field(() => [CreateValueInput])
  declare values: Array<CreateValueInput>
}

@InputType()
export class InterfaceValueInput {
  @Field(() => [CreatePropInput])
  declare props: Array<CreatePropInput>
}

@InputType()
export class CreateValueInput {
  @Field(() => StringValueInput, { nullable: true })
  declare stringValue?: StringValueInput | null

  @Field(() => IntValueInput, { nullable: true })
  declare intValue?: IntValueInput | null

  @Field(() => FloatValueInput, { nullable: true })
  declare floatValue?: FloatValueInput | null

  @Field(() => BoleanValueInput, { nullable: true })
  declare booleanValue?: BoleanValueInput | null

  @Field(() => ArrayValueInput, { nullable: true })
  declare arrayValue?: ArrayValueInput | null

  @Field(() => InterfaceValueInput, { nullable: true })
  declare interfaceValue?: InterfaceValueInput | null
}

@InputType()
export class CreatePropInput {
  @Field()
  declare fieldId: string

  @Field(() => String, { nullable: true })
  declare pageElementId?: string | null

  @Field(() => CreateValueInput, { nullable: true })
  declare value?: CreateValueInput | null
}
