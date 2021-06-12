import { FetchResult } from '@apollo/client'
import { DeleteResponse, MutationUseCase } from '@codelab/backend'
import {
  DeleteFieldGql,
  DeleteFieldMutation,
  DeleteFieldMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { DeleteFieldRequest } from './delete-field.request'

type GqlVariablesType = DeleteFieldMutationVariables
type GqlOperationType = DeleteFieldMutation

@Injectable()
export class DeleteFieldService extends MutationUseCase<
  DeleteFieldRequest,
  DeleteResponse,
  GqlOperationType,
  GqlVariablesType
> {
  protected getGql() {
    return DeleteFieldGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    const affected = result?.data?.deleteField?.numUids

    if (!affected) {
      throw new Error('Error while deleting field')
    }

    return {
      affected,
    }
  }

  protected mapVariables({
    input: { fieldId },
  }: DeleteFieldRequest): GqlVariablesType {
    return {
      filter: {
        id: [fieldId],
      },
    }
  }
}
