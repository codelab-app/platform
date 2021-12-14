import { AtomType } from '@codelab/shared/abstract/core'
import { Field, InputType, Int, OmitType } from '@nestjs/graphql'
import { AddHookToElementInput } from '../hooks/add-hook-to-element'
import { CreatePropMapBindingInput } from '../prop-mapping/create-prop-map-binding'

@InputType()
export class HookRef extends OmitType(AddHookToElementInput, ['elementId']) {}

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

@InputType({
  description: 'Provide either id or new element input',
})
// generic is needed to avoid circular dependency
export class ElementRef<TInput = CreateElementChildInput> {
  @Field(() => String, {
    nullable: true,
    description: 'Pass in either refId, or existing elementId',
  })
  elementId?: string

  @Field(() => CreateElementChildInput, { nullable: true })
  newElement?: TInput
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

  @Field(() => [ElementRef], {
    nullable: true,
    description:
      'Creates new elements or attaches existing ones, can be used to create a whole tree at once',
  })
  declare children?: Array<ElementRef<CreateElementChildInput>>

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

  @Field(() => [HookRef], { nullable: true })
  declare hooks?: Array<HookRef>

  @Field(() => [NewPropMapBindingRef], { nullable: true })
  declare propMapBindings?: Array<NewPropMapBindingRef>

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
