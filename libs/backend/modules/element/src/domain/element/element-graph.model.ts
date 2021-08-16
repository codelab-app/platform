import { Graph } from '@codelab/shared/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { ElementEdge } from './element-edge.model'
import { ElementVertex } from './element-vertex.model'

/**
 * Flattened Element tree that is used as to transfer the element tree data across graphql, because we can't do recursive queries in graphql so we collect every child and their edges into a graph and serve that instead.
 */
@ObjectType()
export class ElementGraph implements Graph<ElementVertex, ElementEdge> {
  @Field(() => [ElementVertex], {
    description: 'All descendant Elements or Components, at any level',
  })
  declare vertices: ReadonlyArray<ElementVertex>

  @Field(() => [ElementEdge], {
    description: 'All the links connecting the descendant elements/components',
  })
  declare edges: ReadonlyArray<ElementEdge>

  constructor(
    vertices: ReadonlyArray<ElementVertex>,
    edges: ReadonlyArray<ElementEdge>,
  ) {
    this.vertices = vertices
    this.edges = edges
  }
}
