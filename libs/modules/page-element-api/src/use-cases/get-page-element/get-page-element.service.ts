import { FetchResult } from '@apollo/client'
import { ApolloClientService, QueryUseCase } from '@codelab/backend'
import {
  GetPageElementGql,
  GetPageElementQuery,
  GetPageElementQueryVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { PageElement, pageElementSchema } from '../../models'
import { GetPageElementInput } from './get-page-element.input'

type GqlVariablesType = GetPageElementQueryVariables
type GqlOperationType = GetPageElementQuery

@Injectable()
export class GetPageElementService extends QueryUseCase<
  GetPageElementInput,
  PageElement | null,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(apollo: ApolloClientService) {
    super(apollo)
  }

  protected getGql() {
    return GetPageElementGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    console.log(pageElementSchema.parse(result?.data?.getPageElement))

    return pageElementSchema.parse(result?.data?.getPageElement) || null
  }

  protected getVariables(request: GetPageElementInput): GqlVariablesType {
    return {
      id: request.pageElementId,
    }
  }
}
