import { ILambda } from '@codelab/shared/abstract/core'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Lambda implements Omit<ILambda, '__typename'> {
  @Field(() => ID)
  declare id: string

  @Field()
  declare ownerId: string

  @Field()
  declare name: string

  @Field()
  declare body: string

  constructor({ id, ownerId, name, body }: Lambda) {
    this.id = id
    this.ownerId = ownerId
    this.name = name
    this.body = body
  }
}

@ObjectType()
export class LambdaPayload {
  @Field()
  declare payload: string
}
