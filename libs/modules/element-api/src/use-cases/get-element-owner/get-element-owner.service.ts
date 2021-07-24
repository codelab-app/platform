import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, QueryUseCase } from '@codelab/backend'
import {
  GetElementOwnerGql,
  GetElementOwnerQuery,
  GetElementOwnerQueryVariables,
} from '@codelab/codegen/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { GetElementOwnerRequest } from './get-element-owner.request'
import { GetElementOwnerResponse } from './get-element-owner.response'

type GqlVariablesType = GetElementOwnerQueryVariables
type GqlOperationType = GetElementOwnerQuery

@Injectable()
export class GetElementOwnerService extends QueryUseCase<
  GetElementOwnerRequest,
  GetElementOwnerResponse,
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
    return GetElementOwnerGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    // For now just return the owner of the app that this element is part off
    // later if element is used somewhere else, put ownership logic here
    // for example - if we add element as children to component - check
    // getElement.component.library.ownerId
    return {
      ownerId: result?.data?.getElement?.ownedBy?.app?.ownerId,
      element: result?.data?.getElement || undefined,
    }
  }

  protected mapVariables({
    elementId,
  }: GetElementOwnerRequest): GqlVariablesType {
    return {
      elementId,
    }
  }
}
