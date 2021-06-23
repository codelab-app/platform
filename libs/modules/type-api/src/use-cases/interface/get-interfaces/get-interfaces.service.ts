import { FetchResult } from '@apollo/client'
import { QueryUseCase } from '@codelab/backend'
import {
  GetInterfacesGql,
  GetInterfacesQuery,
  GetInterfacesQueryVariables,
} from '@codelab/codegen/dgraph'
import { Injectable } from '@nestjs/common'
import { Interface, interfaceSchema } from '../../../models'
import { GetInterfacesRequest } from './get-interfaces.request'

type GqlVariablesType = GetInterfacesQueryVariables
type GqlOperationType = GetInterfacesQuery

@Injectable()
export class GetInterfacesService extends QueryUseCase<
  GetInterfacesRequest,
  Array<Interface>,
  GqlOperationType,
  GqlVariablesType
> {
  protected getGql() {
    return GetInterfacesGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return interfaceSchema.array().parse(result?.data?.queryInterface || [])
  }

  protected mapVariables(request: GetInterfacesRequest): GqlVariablesType {
    return {}
  }
}
