import { FetchResult } from '@apollo/client'
import { MutationUseCase } from '@codelab/backend'
import {
  UpdateEnumTypeGql,
  UpdateEnumTypeMutation,
  UpdateEnumTypeMutationVariables,
} from '@codelab/codegen/dgraph'
import { Injectable } from '@nestjs/common'
import { EnumType } from '../../../models'
import { UpdateEnumTypeInput } from './update-enum-type.input'

type GqlVariablesType = UpdateEnumTypeMutationVariables
type GqlOperationType = UpdateEnumTypeMutation

@Injectable()
export class UpdateEnumTypeService extends MutationUseCase<
  UpdateEnumTypeInput,
  EnumType,
  GqlOperationType,
  GqlVariablesType
> {
  protected getGql() {
    return UpdateEnumTypeGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    const dataArray = result.data?.updateEnumType?.enumType
    const dataItem = (dataArray || [])[0]

    if (!dataItem) {
      throw new Error('Error while updating enum type')
    }

    return new EnumType(dataItem.id, dataItem.name, dataItem.allowedValues)
  }

  protected mapVariables({
    typeId,
    updateData: { name, allowedValues },
  }: UpdateEnumTypeInput): GqlVariablesType {
    return {
      input: {
        filter: { id: [typeId] },
        set: { name, allowedValues },
      },
    }
  }
}
