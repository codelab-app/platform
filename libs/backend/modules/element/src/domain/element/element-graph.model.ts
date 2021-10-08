import {
  IElement,
  IElementEdge,
  IElementGraph,
} from '@codelab/shared/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { Element } from './element.model'
import { ElementEdge } from './element-edge.model'

/**
 * Flattened Element tree that is used as to transfer the element tree data across graphql, because we can't do recursive queries in graphql so we collect every child and their edges into a graph and serve that instead.
 */
@ObjectType()
export class ElementGraph implements IElementGraph {
  @Field(() => [Element])
  declare vertices: Array<IElement>

  @Field(() => [ElementEdge], {
    description: 'All the links connecting the descendant elements',
  })
  declare edges: Array<IElementEdge>

  constructor({ vertices = [], edges = [] }: IElementGraph) {
    this.vertices = vertices.map((vertex) => {
      return new Element(vertex)
    })
    this.edges = edges.map((edge) => new ElementEdge(edge))
  }
}
