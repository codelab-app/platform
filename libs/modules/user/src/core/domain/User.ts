import { Field, ObjectType } from '@nestjs/graphql'
import { App } from '../../../../app/src/core/domain/App'

@ObjectType('User')
export class User {
  @Field()
  declare id: string

  @Field({ defaultValue: '' })
  declare email: string

  @Field({ defaultValue: '' })
  declare accessToken?: string

  @Field(() => [App], { defaultValue: [] })
  declare apps: Array<App>
}
