import { Field, InputType } from '@nestjs/graphql'
import { VertexType } from '@prisma/client'
import { MinLength, Required } from '@tsed/schema'
import { GraphQLJSONObject } from 'graphql-type-json'
import { PropsList } from '@codelab/antd'
import { Grid } from '@codelab/tools/generators/json-schema'
import { JsonSchemaTypeDependencies } from 'libs/backend/src/common/decorators/JsonSchemaTypeDependencies'
@Grid<any>({
  props: {
    'data-grid': {
      x: {
        __grid: {
          order: 1,
          span: 6,
        },
      },
      y: {
        __grid: {
          order: 2,
          span: 6,
        },
      },
      w: {
        __grid: {
          order: 3,
          span: 6,
        },
      },
      h: {
        __grid: {
          order: 4,
          span: 6,
        },
      },
    },
  },
})
@InputType()
@JsonSchemaTypeDependencies(PropsList)
export class UpdateVertexInput {
  @Field()
  @MinLength(3)
  @Required()
  declare vertexId: string

  @Field(() => String, { nullable: true })
  declare type?: VertexType

  @Field(() => GraphQLJSONObject, { nullable: true })
  declare props?: object
}
