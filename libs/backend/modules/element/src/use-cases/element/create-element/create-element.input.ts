import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateElementChildInput {
  @Field({ nullable: true })
  declare name?: string

  @Field(() => String, { nullable: true })
  declare atomId?: string

  @Field(() => Int, {
    nullable: true,
    description:
      'Leave it out to automatically set it as the last order of all the children',
  })
  declare order?: number | null

  @Field(() => String, { nullable: true })
  declare css?: string

  @Field(() => String, { nullable: true })
  declare props?: string

  @Field(() => String, { nullable: true })
  declare renderForEachPropKey?: string

  @Field(() => String, { nullable: true })
  declare renderIfPropKey?: string

  @Field(() => String, { nullable: true })
  declare propTransformationJs?: string

  @Field(() => Boolean, { nullable: true })
  declare isComponent?: boolean

  @Field(() => String, { nullable: true })
  declare instanceOfComponentId?: string

  @Field(() => String, { nullable: true })
  declare componentFixedId?: string
}

@InputType()
export class CreateElementInput extends CreateElementChildInput {
  @Field({
    nullable: true,
    description:
      'Attaches the newly created element to an existing element as child',
  })
  declare parentElementId?: string
}
