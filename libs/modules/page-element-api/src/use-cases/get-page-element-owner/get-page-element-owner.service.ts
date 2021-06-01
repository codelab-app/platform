import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, QueryUseCase } from '@codelab/backend'
import {
  GetPageElementOwnerGql,
  GetPageElementOwnerQuery,
  GetPageElementOwnerQueryVariables,
} from '@codelab/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { GetPageElementOwnerRequest } from './get-page-element-owner.request'
import { GetPageElementOwnerResponse } from './get-page-element-owner.response'

type GqlVariablesType = GetPageElementOwnerQueryVariables
type GqlOperationType = GetPageElementOwnerQuery

@Injectable()
export class GetPageElementOwnerService extends QueryUseCase<
  GetPageElementOwnerRequest,
  GetPageElementOwnerResponse,
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
    return GetPageElementOwnerGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return {
      ownerId: result?.data?.getPageElement?.page?.app?.ownerId,
      pageElement: result?.data?.getPageElement || undefined,
    }
  }

  protected mapVariables({
    pageElementId,
  }: GetPageElementOwnerRequest): GqlVariablesType {
    return {
      pageElementId,
    }
  }
}
