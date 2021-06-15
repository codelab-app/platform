import { FetchResult } from '@apollo/client'
import { QueryUseCase } from '@codelab/backend'
import {
  Dgraph__InterfaceWithAtomFragment,
  GetInterfaceWithAtomGql,
  GetInterfaceWithAtomQuery,
  GetInterfaceWithAtomQueryVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { GetInterfaceWithAtomRequest } from './get-interface-with-atom.request'

type GqlVariablesType = GetInterfaceWithAtomQueryVariables
type GqlOperationType = GetInterfaceWithAtomQuery

@Injectable()
export class GetInterfaceWithAtomService extends QueryUseCase<
  GetInterfaceWithAtomRequest,
  Dgraph__InterfaceWithAtomFragment | null,
  GqlOperationType,
  GqlVariablesType
> {
  protected getGql() {
    return GetInterfaceWithAtomGql
  }

  protected extractDataFromResult({ data }: FetchResult<GqlOperationType>) {
    return data?.getInterface || null
  }

  protected mapVariables({
    interfaceId,
  }: GetInterfaceWithAtomRequest): GqlVariablesType {
    return { interfaceId }
  }
}
