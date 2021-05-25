import { Atom } from '@codelab/modules/atom-api'
import { Field, ObjectType } from '@nestjs/graphql'
import { PageElement } from './page-element.model'
import { PageElementLink } from './page-element-link.model'

/**
 * Distinguished PageElement that is used as a root aggregate, because we can't do recursive queries in graphql
 * so we collect every child and their edges into a PageElementRoot and serve that instead
 */
@ObjectType()
export class PageElementRoot extends PageElement {
  @Field(() => [PageElement], {
    description:
      'All descendant PageElements that are under this root, at any level',
  })
  declare descendents: Array<PageElement>

  @Field(() => [PageElementLink], {
    description: 'All the links connecting the descendant page elements',
  })
  declare links: Array<PageElementLink>

  constructor(
    id: string,
    name: string,
    atom: Atom | null,
    descendents: Array<PageElement>,
    links: Array<PageElementLink>,
  ) {
    super(id, name, atom)
    this.descendents = descendents
    this.links = links
  }
}
