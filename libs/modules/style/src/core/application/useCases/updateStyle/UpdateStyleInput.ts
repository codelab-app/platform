import { Field, InputType } from '@nestjs/graphql'
import { Property } from '@tsed/schema'
import { GraphQLJSONObject } from 'graphql-type-json'
import { CssProps } from '@codelab/antd'
import { JsonSchemaArray } from '@codelab/backend'

@InputType()
export class UpdateStyleInput {
  @Property()
  @Field()
  declare styleId: string

  @Property()
  @Field()
  declare name: string

  @JsonSchemaArray(CssProps)
  @Field(() => GraphQLJSONObject, { nullable: true })
  declare props?: object
}
