import { FetchResult } from '@apollo/client'
import { QueryUseCase } from '@codelab/backend'
import {
  GetFieldsByTypeGql,
  GetFieldsByTypeQuery,
  GetFieldsByTypeQueryVariables,
} from '@codelab/codegen/dgraph'
import { Injectable } from '@nestjs/common'
import { Field } from '../../../models'
import { GetFieldsByTypeInput } from './get-fields-by-type.input'

type GqlVariablesType = GetFieldsByTypeQueryVariables
type GqlOperationType = GetFieldsByTypeQuery

@Injectable()
export class GetFieldsByTypeService extends QueryUseCase<
  GetFieldsByTypeInput,
  Array<Pick<Field, 'name' | 'id'>>,
  GqlOperationType,
  GqlVariablesType
> {
  protected getGql() {
    return GetFieldsByTypeGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return (
      result?.data?.queryField
        ?.filter((f) => !!f?.type?.id)
        .map((f) => ({
          id: (f as any).id as string,
          name: (f as any).name as string,
        })) || []
    )
  }

  protected mapVariables(request: GetFieldsByTypeInput): GqlVariablesType {
    return {
      typeId: request.typeId,
    }
  }
}
