import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, QueryUseCase } from '@codelab/backend'
import {
  Dgraph_ElementFragment,
  GetElementParentGql,
  GetElementParentQuery,
  GetElementParentQueryVariables,
} from '@codelab/codegen/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { GetElementParentInput } from './get-element-parent.input'

type GqlVariablesType = GetElementParentQueryVariables
type GqlOperationType = GetElementParentQuery

/**
 * Returns the parent of the requested element or null if there is not parent
 */
@Injectable()
export class GetElementParentService extends QueryUseCase<
  GetElementParentInput,
  Dgraph_ElementFragment | null,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return GetElementParentGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return result?.data?.getElement?.parent
      ? result?.data?.getElement?.parent
      : null
  }

  protected mapVariables(request: GetElementParentInput): GqlVariablesType {
    return {
      elementId: request.elementId,
    }
  }
}
