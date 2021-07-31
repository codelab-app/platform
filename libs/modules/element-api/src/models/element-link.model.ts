import { Edge } from '@codelab/backend'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'An edge between two element nodes' })
export class ElementEdge implements Edge {
  @Field({ description: 'The id of the source Element' })
  declare source: string

  @Field({ description: 'The id of the target Element' })
  declare target: string

  @Field(() => Int)
  declare order: number

  constructor(source: string, target: string, order: number) {
    this.source = source
    this.target = target
    this.order = order
  }
}
