import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@codelab/modules/user'

@ObjectType('Lambda')
export class Lambda {
  @Field()
  declare id: string

  @Field()
  declare name: string

  @Field()
  declare body: string

  @Field(() => User)
  declare user: User
}
