import { Field, InputType } from '@nestjs/graphql'
import { VertexType } from '@prisma/client'
import { MinLength, Required, Schema, getJsonSchema } from '@tsed/schema'
import { GraphQLJSONObject } from 'graphql-type-json'
// import { PropsSchema } from '@codelab/generated'
import { Props } from '@codelab/antd'
import { Grid } from '@codelab/tools/generators/json-schema'

// @Keyword({
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
//   keyword: 'dependencies',
//   type: 'object',
//   schemaType: 'object',
// })
// class DepsKeyword implements KeywordMethods {
//   compile(schema: any, parentSchema: any) {
//     console.log('hello')
//
//     return parentSchema
//   }
// }

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

  @Field(() => String, { nullable: true })
  declare type?: VertexType

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Schema(getJsonSchema(Props, { customKeys: true }))
  declare props?: object
}
