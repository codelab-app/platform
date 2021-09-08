import { DgraphAtom } from '@codelab/backend/infra'
import { HookModel } from '@codelab/backend/modules/hook'
import { Field, ID, ObjectType } from '@nestjs/graphql'

/**
 * The Element is our base renderable unit
 *
 * Currently it's only rendered either as atom container with children, or just children.
 * When we add components we will be able to render them inside also
 *
 * Note that the Element model is not the same as the one in DGraph, because we transform it to avoid recursion
 *
 * Component relationship is implied by the graph, it's not contained in the model, because it would create a recursive relationship
 */
@ObjectType()
export class Element {
  @Field(() => ID)
  id: string

  /**
   * Field with same key must have same nullability. GraphQL wise needs to be non-nullable, domain wise is nullable.
   *
   * https://github.com/graphql/graphql-js/issues/1361
   *
   * {@link ElementVertex}
   *
   **/
  @Field({
    description:
      'Due to union nullability issue, we have to make this non-nullable. Defaults to atom type',
  })
  name: string

  @Field(() => String, { nullable: true })
  /** The CSS string that gets passed down to emotion */
  css?: string | null

  /**
   * Resolved by field resolvers
   *
   * We allow null atoms, because then we won't render a container element, just the children
   */
  atom?: DgraphAtom | null

  @Field({ description: 'Props in a json format' })
  props: string

  @Field(() => [HookModel])
  hooks: Array<HookModel>

  @Field(() => String, {
    description:
      'If set, the element will get rendered for each item in the array found in its props by the given key, if it exists',
    nullable: true,
  })
  renderForEachPropKey?: string

  @Field(() => String, {
    description:
      'If set, the element will get rendered only if the prop with the given key exists and is evaluated as truthy (exception - the string "false" will evaluate to falsy)',
    nullable: true,
  })
  renderIfPropKey?: string

  constructor({
    id,
    name = '',
    atom,
    props,
    css,
    hooks,
    renderForEachPropKey,
    renderIfPropKey,
  }: Element) {
    this.id = id
    this.name = name
    this.atom = atom
    this.css = css
    this.props = props
    this.hooks = hooks
    this.renderForEachPropKey = renderIfPropKey
    this.renderForEachPropKey = renderForEachPropKey
  }
}
