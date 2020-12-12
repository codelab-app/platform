import { Field, ObjectType } from '@nestjs/graphql'
import { TypeOrmUser } from '@codelab/backend'

@ObjectType()
export class User {
  @Field((returns) => TypeOrmUser)
  declare user: TypeOrmUser

  @Field()
  declare accessToken: string
}
