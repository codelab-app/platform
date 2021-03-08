import { Field, ObjectType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { App } from '../../../../app/src/core/domain/App'
import { Vertex } from '../../../../graph/src/core/domain/vertex/Vertex'

@ObjectType('Style')
export class Style {
  @Field()
  declare id: string

  @Field()
  declare name: string

  @Field(() => GraphQLJSONObject, { defaultValue: {}, nullable: true })
  declare props?: object

  @Field(() => App)
  declare app: App

  @Field(() => [Vertex], { defaultValue: [], nullable: true })
  declare vertices: Array<Vertex>
}
