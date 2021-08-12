import { Edge } from '@codelab/backend/abstract/types'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'An edge between two element nodes' })
export class TagEdge implements Edge {
  @Field({ description: 'The id of the source Tag' })
  declare source: string

  @Field({ description: 'The id of the target Tag' })
  declare target: string

  @Field(() => Int, { nullable: true })
  declare order?: number

  constructor(source: string, target: string, order?: number) {
    this.source = source
    this.target = target
    this.order = order
  }
}
