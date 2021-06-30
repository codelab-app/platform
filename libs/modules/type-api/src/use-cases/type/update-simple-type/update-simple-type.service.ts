import { FetchResult } from '@apollo/client'
import { MutationUseCase } from '@codelab/backend'
import {
  UpdateSimpleTypeGql,
  UpdateSimpleTypeMutation,
  UpdateSimpleTypeMutationVariables,
} from '@codelab/codegen/dgraph'
import { Injectable } from '@nestjs/common'
import { SimpleType } from '../../../models'
import { UpdateSimpleTypeInput } from './update-simple-type.input'

type GqlVariablesType = UpdateSimpleTypeMutationVariables
type GqlOperationType = UpdateSimpleTypeMutation

@Injectable()
export class UpdateSimpleTypeService extends MutationUseCase<
  UpdateSimpleTypeInput,
  SimpleType,
  GqlOperationType,
  GqlVariablesType
> {
  protected getGql() {
    return UpdateSimpleTypeGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    const dataArray = result.data?.updateSimpleType?.simpleType
    const dataItem = (dataArray || [])[0]

    if (!dataItem) {
      throw new Error('Error while updating enum type')
    }

    return new SimpleType(dataItem.id, dataItem.name, dataItem.primitiveType)
  }

  protected mapVariables({
    typeId,
    updateData: { name, primitiveType },
  }: UpdateSimpleTypeInput): GqlVariablesType {
    return {
      input: {
        filter: { id: [typeId] },
        set: { name, primitiveType },
      },
    }
  }
}
