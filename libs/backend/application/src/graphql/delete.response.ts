import { DeleteResponsePort } from '@codelab/backend/abstract/core'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DeleteResponse implements DeleteResponsePort {
  @Field(() => Int)
  declare affected: number
}
