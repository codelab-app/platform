import { FetchResult } from '@apollo/client'
import { ApolloClientService, QueryUseCase } from '@codelab/backend'
import {
  GetPageElementParentGql,
  GetPageElementParentQuery,
  GetPageElementParentQueryVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { PageElement, pageElementSchema } from '../../models'
import { GetPageElementParentInput } from './get-page-element-parent.input'

type GqlVariablesType = GetPageElementParentQueryVariables
type GqlOperationType = GetPageElementParentQuery

/**
 * Returns the parent of the requested page element or null if there is not parent
 */
@Injectable()
export class GetPageElementParentService extends QueryUseCase<
  GetPageElementParentInput,
  PageElement | null,
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
      ? pageElementSchema.parse(result?.data?.getPageElement?.parent)
      : null
  }

  protected getVariables(request: GetPageElementParentInput): GqlVariablesType {
    return {
      pageElementId: request.pageElementId,
    }
  }
}
