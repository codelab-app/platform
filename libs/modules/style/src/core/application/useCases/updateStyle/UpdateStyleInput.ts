import { Field, InputType } from '@nestjs/graphql'
import { GraphQLJSONObject } from 'graphql-type-json'
import { CssProps } from '@codelab/antd'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@InputType()
@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
export class UpdateStyleInput {
  @Field()
  @RjsfGridProp({ row: 0, span: 24, uiSchema: { 'ui:widget': 'hidden' }})
  declare styleId: string

  @Field()
  @RjsfGridProp({ row: 1, span: 24 })
  declare name: string

  // @JsonSchemaArray(CssProps)
  @Field(() => GraphQLJSONObject, { nullable: true })
  @RjsfGridProp({ row: 2, span: 24, isArray: true, clazz: CssProps })
  declare props?: object
}
