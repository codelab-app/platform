import { Atom } from '@codelab/backend/modules/atom'
import { Hook } from '@codelab/backend/modules/hook'
import { Prop } from '@codelab/backend/modules/prop'
import { Tag } from '@codelab/backend/modules/tag'
import { IElement, IPropMapBinding } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { PropMapBinding } from '../prop-mapping/prop-map-binding.model'

@ObjectType()
export class ComponentRef {
  @Field(() => ID)
  declare id: string
}

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
  name: Maybe<string>

  @Field(() => Tag, {
    nullable: true,
    description: 'An Element tagged with componentTag is a reusable component',
  })
  componentTag?: Maybe<Tag>

  @Field(() => String, { nullable: true })
  componentFixedId: Maybe<string>

  @Field(() => String, { nullable: true })
  /** The CSS string that gets passed down to emotion */
  css?: Maybe<string>

  @Field(() => Atom, { nullable: true })
  atom?: Maybe<Atom>

  @Field(() => Prop)
  props: Prop

  @Field(() => [Hook])
  hooks: Array<Hook>

  @Field(() => String, {
    description:
      'If set, the element will get rendered for each item in the array found in its props by the given key, if it exists',
    nullable: true,
  })
  renderForEachPropKey?: Maybe<string>

  @Field(() => String, {
    description:
      'If set, the element will get rendered only if the prop with the given key exists and is evaluated as truthy (exception - the string "false" will evaluate to falsy)',
    nullable: true,
  })
  renderIfPropKey?: Maybe<string>

  @Field(() => [PropMapBinding])
  propMapBindings: Array<IPropMapBinding>

  @Field(() => String, { nullable: true })
  propTransformationJs?: Maybe<string>

  @Field(() => ComponentRef, { nullable: true })
  instanceOfComponent?: ComponentRef

  constructor({
    id,
    name = '',
    atom,
    props,
    css,
    hooks = [],
    componentTag,
    componentFixedId = null,
    renderForEachPropKey,
    renderIfPropKey,
    propMapBindings = [],
    instanceOfComponent,
    propTransformationJs,
  }: IElement) {
    this.id = id!
    this.name = name
    this.atom = atom as any
    this.css = css
    this.componentTag = componentTag
    this.componentFixedId = componentFixedId
    this.props = props
    this.hooks = hooks
    this.renderIfPropKey = renderIfPropKey
    this.renderForEachPropKey = renderForEachPropKey
    this.propMapBindings = propMapBindings
    this.propTransformationJs = propTransformationJs
    this.instanceOfComponent = instanceOfComponent ?? undefined
  }
}
