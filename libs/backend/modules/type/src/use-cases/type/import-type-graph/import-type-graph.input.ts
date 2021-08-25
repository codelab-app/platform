import { Field as GraphqlField, InputType } from '@nestjs/graphql'

// @InputType()
// export class ImportTypeGraphInput implements ITypeGraphInput {
//   @GraphqlField(() => [ImportTypeVertex])
//   declare vertices: Array<ImportTypeVertex>
//
//   @GraphqlField(() => [ImportTypeEdgeInput])
//   declare edges: ReadonlyArray<ImportTypeEdgeInput>
// }

@InputType()
export class ImportTypeGraphInput {
  @GraphqlField()
  declare name: string
}
