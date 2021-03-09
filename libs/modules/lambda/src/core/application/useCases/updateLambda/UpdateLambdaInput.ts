import { Field, InputType } from '@nestjs/graphql'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
})
@InputType()
export class UpdateLambdaInput {
  @Field()
  @RjsfGridProp({ row: 0, span: 24, title: 'Lambda Id' })
  declare lambdaId: string

  @Field()
  @RjsfGridProp({ row: 1, span: 24, title: 'Name' })
  declare name: string

  @Field()
  @RjsfGridProp({ row: 2, span: 24, title: 'Body' })
  declare body: string
}
