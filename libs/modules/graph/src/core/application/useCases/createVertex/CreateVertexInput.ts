import { Field, InputType } from '@nestjs/graphql'
import { VertexType } from '@prisma/client'
import { Enum } from '@tsed/schema'
import { GraphQLJSONObject } from 'graphql-type-json'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate',
})
@InputType()
export class CreateVertexInput {
  @Field(() => String)
  // @Enum(VertexType)
  @RjsfGridProp({ row: 0, span: 24, required: true, enum: VertexType })
  declare type: VertexType

  @Field(() => GraphQLJSONObject, { nullable: true })
  declare props?: object
}
