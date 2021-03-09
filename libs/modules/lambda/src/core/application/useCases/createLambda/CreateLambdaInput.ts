import { Field, InputType } from '@nestjs/graphql'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';


@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
@InputType()
export class CreateLambdaInput {
  @Field()
  @RjsfGridProp({ row: 0, span: 24, title: 'Name' })
  declare name: string

  @Field()
  @RjsfGridProp({ row: 1, span: 24, title: 'Body' })
  declare body: string

  @Field()
  @RjsfGridProp({ row: 2, span: 24, title: 'App Id' })
  declare appId: string
}
