import { FetchResult } from '@apollo/client'
import { MutationUseCase } from '@codelab/backend'
import {
  UpdatePrimitiveTypeGql,
  UpdatePrimitiveTypeMutation,
  UpdatePrimitiveTypeMutationVariables,
} from '@codelab/codegen/dgraph'
import { Injectable } from '@nestjs/common'
import { PrimitiveType } from '../../../models'
import { UpdatePrimitiveTypeInput } from './update-primitive-type.input'

type GqlVariablesType = UpdatePrimitiveTypeMutationVariables
type GqlOperationType = UpdatePrimitiveTypeMutation

@Injectable()
export class UpdatePrimitiveTypeService extends MutationUseCase<
  UpdatePrimitiveTypeInput,
  PrimitiveType,
  GqlOperationType,
  GqlVariablesType
> {
  protected getGql() {
    return UpdatePrimitiveTypeGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    const dataArray = result.data?.updatePrimitiveType?.primitiveType
    const dataItem = (dataArray || [])[0]

    if (!dataItem) {
      throw new Error('Error while updating enum type')
    }

    return new PrimitiveType(dataItem.id, dataItem.name, dataItem.primitiveKind)
  }

  protected mapVariables({
    typeId,
    updateData: { name, primitiveKind },
  }: UpdatePrimitiveTypeInput): GqlVariablesType {
    return {
      input: {
        filter: { id: [typeId] },
        set: { name, primitiveKind },
      },
    }
  }
}
