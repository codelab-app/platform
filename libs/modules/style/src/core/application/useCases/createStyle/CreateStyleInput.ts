import { Field, InputType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { CssProps } from '@codelab/antd'
import { JsonSchemaArray } from '@codelab/backend'

@InputType()
export class CreateStyleInput {
  @JsonSchemaArray(CssProps)
  @Field(() => GraphQLJSONObject, { nullable: true })
  declare props?: object
}
