import { FetchResult } from '@apollo/client'
import { QueryUseCase } from '@codelab/backend'
import {
  GetArrayValuesGql,
  GetArrayValuesQuery,
  GetArrayValuesQueryVariables,
} from '@codelab/codegen/dgraph'
import { Injectable } from '@nestjs/common'
import { mapGqlFragmentToValue, PropValue, propValueSchema } from '../../models'
import { GetArrayValuesInput } from './get-array-values.input'

type GqlVariablesType = GetArrayValuesQueryVariables
type GqlOperationType = GetArrayValuesQuery

@Injectable()
export class GetArrayValuesService extends QueryUseCase<
  GetArrayValuesInput,
  Array<PropValue>,
  GqlOperationType,
  GqlVariablesType
> {
  protected getGql() {
    return GetArrayValuesGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return propValueSchema
      .array()
      .parse(
        result?.data?.getArrayValue?.values.map((v) =>
          mapGqlFragmentToValue(v),
        ) || [],
      )
  }

  protected mapVariables({
    arrayValueId,
  }: GetArrayValuesInput): GqlVariablesType {
    return { arrayValueId }
  }
}
