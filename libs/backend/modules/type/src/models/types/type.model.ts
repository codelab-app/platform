import { Vertex } from '@codelab/backend/abstract/types'
import { Field, ID, InterfaceType } from '@nestjs/graphql'

@InterfaceType()
export class Type implements Vertex {
  @Field(() => ID)
  declare id: string

  @Field()
  declare name: string
}
