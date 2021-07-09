import { Atom, atomSchema } from '@codelab/modules/atom-api'
import { PropAggregate } from '@codelab/modules/prop-api'
import { createUnionType, Field, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

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

  // @Field(() => Component) //need to add this when component-api is done
  // declare  component: Component

  @Field(() => [PropAggregate])
  // Optional, because the fields resolver can get it
  declare props?: Array<PropAggregate>

  constructor({ id, name, atom, props, css }: Element) {
    this.id = id
    this.name = name
    this.atom = atom
    this.css = css
    this.props = props
  }

  static Schema = z.object({
    id: z.string(),
    name: z.string(),
    css: z.string().optional().nullable(),
    atom: atomSchema.optional().nullable(),
    props: PropAggregate.Schema.array().optional(),
  })
}
