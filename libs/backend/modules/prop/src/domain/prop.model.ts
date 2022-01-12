import { IProp } from '@codelab/shared/abstract/core'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType('Prop')
export class Prop implements IProp {
  @Field(() => ID)
  id: string

  @Field()
  data: string

  constructor(id: string, data: string) {
    this.id = id
    this.data = data
  }
}
