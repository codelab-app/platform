import { CreateResponsePort } from '@codelab/backend/abstract/core'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CreateResponse implements CreateResponsePort {
  @Field()
  declare id: string
}
