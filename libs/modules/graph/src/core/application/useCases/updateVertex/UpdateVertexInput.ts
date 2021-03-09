import { Field, InputType } from '@nestjs/graphql'
import { VertexType } from '@prisma/client'
import { MinLength } from '@tsed/schema'
import { GraphQLJSONObject } from 'graphql-type-json'
import { ButtonProps } from '@codelab/antd'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';


@InputType()
// @JsonSchemaTypeDependencies(PropsList)
@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class UpdateVertexInput {
  @Field()
  @MinLength(3)
  @RjsfGridProp({ row: 0, span: 24, required: true })
  declare vertexId: string

  @Field(() => String, { nullable: true })
  @RjsfGridProp({ row: 1, span: 24, required: true, enum: VertexType })
  declare type?: VertexType

  @RjsfGridProp({
    row: 2,
    span: 24,
    title: 'Button props: ',
    condition: {key: 'type', value: VertexType.React_Button},
    clazz: ButtonProps
  })
  declare buttonProps: ButtonProps

  @Field(() => GraphQLJSONObject, { nullable: true })
  declare props?: object
}
