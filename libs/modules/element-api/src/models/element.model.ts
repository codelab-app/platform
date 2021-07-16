import { Atom } from '@codelab/modules/atom-api'
import { Field, ID, ObjectType } from '@nestjs/graphql'

/**
 * The Element is our base renderable unit
 *
 * Currently it's only rendered either as atom container with children, or just children.
 * When we add components we will be able to render them inside also
 *
 * Note that the Element model is not the same as the one in DGraph, because we transform it to avoid recursion
 */
@ObjectType()
export class Element {
  @Field(() => ID)
  declare id: string

  @Field()
  declare name: string

  @Field(() => String, { nullable: true })
  /** The CSS string that gets passed down to emotion */
  declare css?: string | null

  // We allow null atoms, because then we won't render a container element, just the children
  @Field(() => Atom, { nullable: true })
  declare atom?: Atom | null

  @Field(() => String, {
    nullable: true,
    description:
      'Referenced only by id to avoid recursion. Use ElementGraph to get all needed Components',
  })
  declare componentId?: string | null

  @Field({ description: 'Props in a json format' })
  declare props: string

  constructor({ id, name, atom, props, css, componentId }: Element) {
    this.id = id
    this.name = name
    this.atom = atom
    this.css = css
    this.componentId = componentId
    this.props = props
  }
}
