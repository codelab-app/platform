import { Atom, atomSchema } from '@codelab/modules/atom-api'
import { Field, ID, ObjectType } from '@nestjs/graphql'
import { z } from 'zod'

/**
 *  A PageElement has 1 of 3 ways to be rendered:
 *   1. Atom, with or without children, without component -> render container with children
 *   2. Children, no atom, no component -> render children without container
 *   3. Component, no children, no atom -> render the component itself in place of the element
 *  We can add component + children later
 *
 *  Note that this PageElement is not the same as the one in DGraph, because we transform it to avoid recursion
 *  @see {@link PageElementRoot}
 */
@ObjectType()
export class PageElement {
  @Field(() => ID)
  declare id: string

  @Field()
  declare name: string

  // We allow null atoms, because then we won't render a container element, just the children
  @Field(() => Atom, { nullable: true })
  declare atom?: Atom | null

  // @Field(() => Component) //need to add this when component-api is done
  // declare  component: Component

  constructor({ id, name, atom }: PageElement) {
    this.id = id
    this.name = name
    this.atom = atom
  }
}

export const pageElementSchema = z.object({
  id: z.string(),
  name: z.string(),
  atom: atomSchema.optional().nullable(),
})
