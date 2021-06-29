import { FetchResult } from '@apollo/client'
import { MutationUseCase } from '@codelab/backend'
import {
  UpdateTypeGql,
  UpdateTypeMutation,
  UpdateTypeMutationVariables,
} from '@codelab/codegen/dgraph'
import { Injectable } from '@nestjs/common'
import { Type } from '../../../models'
import { UpdateTypeInput } from './update-type.input'

type GqlVariablesType = UpdateTypeMutationVariables
type GqlOperationType = UpdateTypeMutation

@Injectable()
export class UpdateTypeService extends MutationUseCase<
  UpdateTypeInput,
  Type,
  GqlOperationType,
  GqlVariablesType
> {
  protected getGql() {
    return UpdateTypeGql
  }

  protected extractDataFromResult({ data }: FetchResult<GqlOperationType>) {
    const dataArray = data?.updateType?.type
    const item = (dataArray || [])[0]

    if (!dataArray || !item) {
      throw new Error('Error while updating type')
    }

    return {
      id: item.id,
      name: item.name,
    }
  }

  protected mapVariables({
    typeId,
    updateData: { name },
  }: UpdateTypeInput): GqlVariablesType {
    return {
      input: {
        filter: { id: [typeId] },
        set: { name },
      },
    }
  }
}
