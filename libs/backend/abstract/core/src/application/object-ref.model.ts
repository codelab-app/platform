import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ObjectRef {
  @Field(() => ID)
  declare id: string
}
