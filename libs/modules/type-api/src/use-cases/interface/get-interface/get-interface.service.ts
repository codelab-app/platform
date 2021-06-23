import { QueryUseCase } from '@codelab/backend'
import {
  GetInterfaceGql,
  GetInterfaceQuery,
  GetInterfaceQueryVariables,
} from '@codelab/codegen/dgraph'
import { Injectable } from '@nestjs/common'
import { FetchResult } from 'apollo-link'
import { Interface, interfaceSchema } from '../../../models'
import { GetInterfaceRequest } from '../get-interface'

type GqlVariablesType = GetInterfaceQueryVariables
type GqlOperationType = GetInterfaceQuery

@Injectable()
export class GetInterfaceService extends QueryUseCase<
  GetInterfaceRequest,
  Omit<Interface, 'fieldCollection'> | null,
  GqlOperationType,
  GqlVariablesType
> {
  protected getGql() {
    return GetInterfaceGql
  }

  protected mapVariables({
    input: { interfaceId },
  }: GetInterfaceRequest): GqlVariablesType {
    return {
      interfaceId,
    }
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return interfaceSchema.nullable().parse(result.data?.getInterface || null)
  }
}
