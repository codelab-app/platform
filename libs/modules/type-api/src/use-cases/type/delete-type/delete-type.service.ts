import { FetchResult } from '@apollo/client'
import { DeleteResponse, MutationUseCase } from '@codelab/backend'
// import {
//   DeleteTypeGql,
//   DeleteTypeMutation,
//   DeleteTypeMutationVariables,
// } from '@codelab/codegen/dgraph'
import { Injectable } from '@nestjs/common'
import { DeleteTypeInput } from './delete-type.input'

type GqlVariablesType = any // DeleteTypeMutationVariables
type GqlOperationType = any // DeleteTypeMutation

@Injectable()
export class DeleteTypeService extends MutationUseCase<
  DeleteTypeInput,
  DeleteResponse,
  GqlOperationType,
  GqlVariablesType
> {
  protected getGql() {
    return null as any
    // return DeleteTypeGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return null as any
  }

  protected mapVariables(request: DeleteTypeInput): GqlVariablesType {
    return {}
  }
}
