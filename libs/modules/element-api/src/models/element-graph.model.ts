import { Graph } from '@codelab/backend'
import { createUnionType, Field, ObjectType } from '@nestjs/graphql'
import { Component } from '../component'
import { Element } from './element.model'
import { ElementEdge } from './element-link.model'

export const ElementGraphVertex = createUnionType({
  name: 'ElementGraphVertex',
  types: () => [Element, Component],
})

export type ElementGraphVertex = typeof ElementGraphVertex

/**
 * Flattened Element tree that is used as to transfer the element tree data across graphql,
 * because we can't do recursive queries in graphql
 * so we collect every child and their edges into a ElementRoot and serve that instead
 */
@ObjectType()
export class ElementGraph implements Graph<ElementGraphVertex, ElementEdge> {
  @Field(() => [ElementGraphVertex], {
    description: 'All descendant Elements or Components, at any level',
  })
  declare vertices: Array<ElementGraphVertex>

  @Field(() => [ElementEdge], {
    description: 'All the links connecting the descendant elements/components',
  })
  declare edges: Array<ElementEdge>

  constructor(vertices: Array<ElementGraphVertex>, edges: Array<ElementEdge>) {
    this.vertices = vertices
    this.edges = edges
  }
}
