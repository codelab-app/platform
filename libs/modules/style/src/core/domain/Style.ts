import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { App } from '@codelab/modules/app'

@ObjectType('Style')
export class Style {
  @Field()
  declare id: string

  @Field(() => GraphQLJSONObject, { defaultValue: {}, nullable: true })
  declare props?: object

  @Field(() => App)
  declare app: App
}
