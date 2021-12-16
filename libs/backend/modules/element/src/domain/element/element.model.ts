import { ObjectRef } from '@codelab/backend/abstract/core'
import { Atom } from '@codelab/backend/modules/atom'
import { Hook } from '@codelab/backend/modules/hook'
import { Prop } from '@codelab/backend/modules/prop'
import { Tag } from '@codelab/backend/modules/tag'
import { IElement, IPropMapBinding } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { PropMapBinding } from '../prop-mapping/prop-map-binding.model'

/**
 * The Element is our base renderable unit
 *
 * The relationships to to other Elements is stored in ElementGraph, in the form of edges
 */
@ObjectType()
export class Element implements IElement {
  @Field(() => ID)
  id: string

  @Field(() => String, { nullable: true })
  name: Nullable<string>

  @Field(() => Tag, {
    nullable: true,
    description: 'An Element tagged with componentTag is a reusable component',
  })
  componentTag?: Nullable<Tag>

  @Field(() => String, { nullable: true })
  fixedId: Nullable<string>

  @Field(() => String, { nullable: true })
  /** The CSS string that gets passed down to emotion */
  css?: Nullable<string>

  @Field(() => Atom, { nullable: true })
  atom?: Nullable<Atom>

  @Field(() => Prop)
  props: Prop

  @Field(() => [Hook])
  hooks: Array<Hook>

  @Field(() => String, {
    description:
      'If set, the element will get rendered for each item in the array found in its props by the given key, if it exists',
    nullable: true,
  })
  renderForEachPropKey?: Nullable<string>

  @Field(() => String, {
    description:
      'If set, the element will get rendered only if the prop with the given key exists and is evaluated as truthy (exception - the string "false" will evaluate to falsy)',
    nullable: true,
  })
  renderIfPropKey?: Nullable<string>

  @Field(() => [PropMapBinding])
  propMapBindings: Array<IPropMapBinding>

  @Field(() => String, { nullable: true })
  propTransformationJs?: Nullable<string>

  @Field(() => ObjectRef, { nullable: true })
  instanceOfComponent?: ObjectRef

  @Field(() => ObjectRef, { nullable: true })
  parentElement?: ObjectRef

  @Field(() => ObjectRef, { nullable: true })
  owner?: ObjectRef

  constructor({
    id,
    name = '',
    atom,
    props,
    css,
    hooks = [],
    componentTag,
    fixedId = null,
    renderForEachPropKey,
    renderIfPropKey,
    propMapBindings = [],
    instanceOfComponent,
    propTransformationJs,
    parentElement,
    owner,
  }: IElement) {
    this.id = id!
    this.name = name
    this.atom = atom as any
    this.css = css
    this.componentTag = componentTag ?? undefined
    this.fixedId = fixedId
    this.props = props
    this.hooks = hooks
    this.renderIfPropKey = renderIfPropKey
    this.renderForEachPropKey = renderForEachPropKey
    this.propMapBindings = propMapBindings
    this.propTransformationJs = propTransformationJs
    this.owner = owner ?? undefined
    this.parentElement = parentElement ?? undefined
    this.instanceOfComponent = instanceOfComponent ?? undefined
  }
}
