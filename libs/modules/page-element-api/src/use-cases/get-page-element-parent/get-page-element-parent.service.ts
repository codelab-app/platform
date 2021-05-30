import { FetchResult } from '@apollo/client'
import { ApolloClientService, QueryUseCase } from '@codelab/backend'
import {
  Dgraph_PageElementFragment,
  GetPageElementParentGql,
  GetPageElementParentQuery,
  GetPageElementParentQueryVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { GetPageElementParentInput } from './get-page-element-parent.input'

type GqlVariablesType = GetPageElementParentQueryVariables
type GqlOperationType = GetPageElementParentQuery

/**
 * Returns the parent of the requested page element or null if there is not parent
 */
@Injectable()
export class GetPageElementParentService extends QueryUseCase<
  GetPageElementParentInput,
  Dgraph_PageElementFragment | null,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(apollo: ApolloClientService) {
    super(apollo)
  }

  protected getGql() {
    return GetPageElementParentGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return result?.data?.getPageElement?.parent
      ? result?.data?.getPageElement?.parent
      : null
  }

  protected mapVariables(request: GetPageElementParentInput): GqlVariablesType {
    return {
      pageElementId: request.pageElementId,
    }
  }
}
