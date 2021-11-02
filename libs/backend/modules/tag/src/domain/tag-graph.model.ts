import { IGraph } from '@codelab/shared/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'
import { Tag } from './tag.model'
import { TagEdge } from './tag-edge.model'
import { TagVertex } from './tag-vertex.model'

/**
 * Flattened Tag tree that is used as to transfer the tags tree data across graphql, because we can't do recursive queries in graphql so we collect every child and their edges into a graph and serve that instead.
 */
@ObjectType()
export class TagGraph implements IGraph<TagVertex, TagEdge> {
  @Field(() => [TagVertex], {
    description: 'All descendant Elements or Components, at any level',
    defaultValue: [],
  })
  declare vertices: Array<TagVertex>

  @Field(() => [TagEdge], {
    description: 'All the links connecting the descendant elements/components',
    defaultValue: [],
  })
  declare edges: Array<TagEdge>

  constructor({ vertices, edges }: IGraph<TagVertex, TagEdge>) {
    this.vertices = vertices.map((vertex) => new Tag(vertex))
    this.edges = edges.map((edge) => new TagEdge(edge))
  }
}
