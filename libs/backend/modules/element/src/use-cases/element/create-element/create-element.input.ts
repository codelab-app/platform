import { AtomType } from '@codelab/shared/abstract/core'
import { Field, InputType, Int, OmitType } from '@nestjs/graphql'
import { AddHookToElementInput } from '../hooks/add-hook-to-element'
import { CreatePropMapBindingInput } from '../prop-mapping/create-prop-map-binding'

@InputType()
export class NewHookRef extends OmitType(AddHookToElementInput, [
  'elementId',
]) {}

@InputType()
export class NewPropMapBindingRef extends OmitType(CreatePropMapBindingInput, [
  'elementId',
]) {}

@InputType({
  description: 'Provide either id or type',
})
export class AtomRef {
  @Field(() => String, { nullable: true })
  atomId?: string

  @Field(() => AtomType, { nullable: true })
  atomType?: AtomType
}

@InputType()
export class CreateElementChildInput {
  @Field(() => String, {
    nullable: true,
    description:
      'Set to any unique value and use that to identify the created element in other references in the same input, like targetId in Prop Map Binding',
  })
  declare refId?: string

  @Field({ nullable: true })
  declare name?: string

  @Field(() => AtomRef, { nullable: true })
  declare atom?: AtomRef

  @Field(() => Int, {
    nullable: true,
    description:
      'Leave it out to automatically set it as the last order of all the children',
  })
  declare order?: number | null

  @Field(() => [String], {
    nullable: true,
    description:
      'Attaches child elements to the newly created element. Useful for adding component children',
  })
  declare childrenIds?: Array<string>

  @Field(() => [CreateElementChildInput], {
    nullable: true,
    description:
      'Creates new elements and attaches them, can be used to create a whole tree at once. Will get processed after childrenIds',
  })
  declare children?: Array<CreateElementChildInput>

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

  @Field(() => [NewHookRef], { nullable: true })
  declare hooks?: Array<NewHookRef>

  @Field(() => [NewPropMapBindingRef], { nullable: true })
  declare propMapBindings?: Array<NewPropMapBindingRef>

  @Field(() => Boolean, { nullable: true })
  declare isComponent?: true
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
