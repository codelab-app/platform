import { FetchResult } from '@apollo/client'
import { ApolloClientService, QueryUseCase } from '@codelab/backend'
import {
  GetPageGql,
  GetPageQuery,
  GetPageQueryVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { Page } from '../../page.model'
import { GetPageInput } from './get-page.input'

type GqlVariablesType = GetPageQueryVariables
type GqlOperationType = GetPageQuery

@Injectable()
export class GetPageService extends QueryUseCase<
  GetPageInput,
  Partial<Page> | null,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(apollo: ApolloClientService) {
    super(apollo)
  }

  protected getGql() {
    return GetPageGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return (result.data?.getPage as any) || null
  }

  protected getVariables(request: GetPageInput): GqlVariablesType {
    return {
      pageId: request.pageId,
    }
  }
}
