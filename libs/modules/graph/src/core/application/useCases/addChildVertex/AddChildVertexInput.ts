import { Field, InputType } from '@nestjs/graphql'
import { Property } from '@tsed/schema'
import { CreateVertexInput } from '../createVertex/CreateVertexInput'
import { RjsfGrid, RjsfGridProp } from '@codelab/tools/generators/form-decorator';

@RjsfGrid({
  'ui:spacing': 16,
  ObjectFieldTemplate: 'RjsfGridFieldTemplate',
})
@InputType()
export class AddChildVertexInput {
  @Field(() => String, { nullable: true })
  declare parentVertexId: string

  @Field(() => CreateVertexInput)
  // @Property(CreateVertexInput)
  @RjsfGridProp({
    clazz: CreateVertexInput,
    row: 0,
    span: 24,
  })
  declare vertex: CreateVertexInput

  @Field({ nullable: true })
  declare order?: number

  // @Field(() => GraphQLJSONObject, { nullable: true })
  // declare props?: object
}
