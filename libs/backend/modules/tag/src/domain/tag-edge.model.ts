import { IEdge } from '@codelab/shared/abstract/core'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'An edge between two element nodes' })
export class TagEdge implements IEdge {
  @Field({ description: 'The id of the source Tag' })
  declare source: string

  @Field({ description: 'The id of the target Tag' })
  declare target: string

  @Field(() => Int, { nullable: true })
  declare order?: number

  constructor({ source, target, order }: TagEdge) {
    this.source = source
    this.target = target
    this.order = order
  }
}
