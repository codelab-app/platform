import { Graph } from '@codelab/backend'
import { Field, ObjectType } from '@nestjs/graphql'
import { Element } from './element.model'
import { ElementEdge } from './element-link.model'

/**
 * Flattened Element tree that is used as to transfer the element tree data across graphql,
 * because we can't do recursive queries in graphql
 * so we collect every child and their edges into a ElementRoot and serve that instead
 */
@ObjectType()
export class ElementGraph implements Graph<Element, ElementEdge> {
  @Field(() => [Element], {
    description: 'All descendant Elements, at any level',
  })
  declare vertices: Array<Element>

  @Field(() => [ElementEdge], {
    description: 'All the links connecting the descendant elements',
  })
  declare edges: Array<ElementEdge>

  constructor(vertices: Array<Element>, edges: Array<ElementEdge>) {
    this.vertices = vertices
    this.edges = edges
  }
}
