import { IBaseTypeVertex, IVertex } from '@codelab/shared/graph'
import { Field, ID, InterfaceType } from '@nestjs/graphql'

@InterfaceType()
export class Type implements IVertex, IBaseTypeVertex {
  @Field(() => ID)
  declare id: string

  @Field()
  declare name: string
}
