import { Field, ObjectType } from '@nestjs/graphql'
import { Element } from './element.model'
import { ElementLink } from './element-link.model'

/**
 * Distinguished Element that is used as a root aggregate, because we can't do recursive queries in graphql
 * so we collect every child and their edges into a ElementRoot and serve that instead
 */
@ObjectType()
export class ElementAggregate extends Element {
  @Field(() => [Element], {
    description:
      'All descendant Elements that are under this root, at any level',
  })
  declare descendants: Array<Element>

  @Field(() => [ElementLink], {
    description: 'All the links connecting the descendant elements',
  })
  declare links: Array<ElementLink>

  constructor({ id, name, atom, descendants, links, css }: ElementAggregate) {
    super({ id, name, atom, css })
    this.descendants = descendants
    this.links = links
  }
}
