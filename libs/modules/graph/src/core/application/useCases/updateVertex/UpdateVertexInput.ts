import { Field, InputType } from '@nestjs/graphql'
import { VertexType } from '@prisma/client'
import {
  Enum,
  MinLength,
  Optional,
  Required,
  Schema,
  getJsonSchema,
} from '@tsed/schema'
import { GraphQLJSONObject } from 'graphql-type-json'
// import { PropsSchema } from '@codelab/generated'
import { Props } from '@codelab/antd'
import { Grid } from '@codelab/tools/generators/json-schema'

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
export class UpdateVertexInput {
  @Field()
  @MinLength(3)
  @Required()
  declare vertexId: string

  //
  @Optional()
  @Enum(VertexType)
  @Field(() => String, { nullable: true })
  declare type?: VertexType

  // @OneOf(getJsonSchema(ButtonProps), getJsonSchema(RGLItemProps))
  @Schema(getJsonSchema(Props))
  @Field(() => GraphQLJSONObject, { nullable: true })
  declare props?: object
}
