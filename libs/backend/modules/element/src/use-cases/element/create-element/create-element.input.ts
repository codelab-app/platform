import { InputType } from '@nestjs/graphql'

@InputType()
export class CreateElementInput {
  @Field({
    nullable: true,
    description:
      'Attaches the newly created element as child of an existing element',
  })
  declare parentElementId?: string

  @Field({ nullable: true })
  declare name?: string

  @Field({ nullable: true })
  declare css?: string

  @Field(() => String, { nullable: true })
  declare atomId?: string

  @Field(() => Int, {
    nullable: true,
    description:
      'The order in parent. Leave it out to automatically set it as the last order of all the children',
  })
  declare order?: Nullable<number>

  @Field(() => String, { nullable: true })
  declare props?: string

  @Field(() => String, {
    nullable: true,
    description:
      'Set to a elementId with component tag, which will be used as a component template for this element. isComponent and instanceOfComponentId are mutually exclusive',
  })
  declare instanceOfComponentId?: string
}
