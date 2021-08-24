import { ITypeGraphInput } from '@codelab/shared/abstract/core'
import { Field as GraphqlField, InputType } from '@nestjs/graphql'
import { ImportTypeEdgeInput } from '../../../domain'
import { ImportTypeVertex } from '../import-type'

@InputType()
export class ImportTypeGraphInput implements ITypeGraphInput {
  @GraphqlField(() => [ImportTypeVertex])
  declare vertices: Array<ImportTypeVertex>

  @GraphqlField(() => [ImportTypeEdgeInput])
  declare edges: ReadonlyArray<ImportTypeEdgeInput>
}
