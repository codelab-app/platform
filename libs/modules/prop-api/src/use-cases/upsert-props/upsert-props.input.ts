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
  @Field(() => [UpsertValueInput])
  declare values: Array<UpsertValueInput>
}

@InputType()
export class InterfaceValueInput {
  @Field(() => [UpsertPropsInput])
  declare props: Array<UpsertPropsInput>
}

@InputType()
export class UpsertValueInput {
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

  @Field(() => String, { nullable: true })
  declare enumValueId?: string | null
}

@InputType()
export class UpsertPropsInput {
  @Field(() => String, { nullable: true })
  declare propId?: string | null

  @Field()
  declare fieldId: string

  // Nullable, because later one we might want to create prop for a component or something else
  @Field(() => String, { nullable: true })
  declare pageElementId?: string | null

  @Field(() => UpsertValueInput, { nullable: true })
  declare value?: UpsertValueInput | null
}
