import { IElementEdge } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'An edge between two element nodes' })
export class ElementEdge implements IElementEdge {
  @Field({ description: 'The id of the source Element' })
  declare source: string

  @Field({ description: 'The id of the target Element' })
  declare target: string

  @Field(() => Int, { nullable: true })
  declare order: Maybe<number>

  constructor({ source, target, order }: ElementEdge) {
    this.source = source
    this.target = target
    this.order = order
  }
}
