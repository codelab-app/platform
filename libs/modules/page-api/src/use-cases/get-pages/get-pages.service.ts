import { FetchResult } from '@apollo/client'
import { ApolloClientService, QueryUseCase } from '@codelab/backend'
import {
  Dgraph__PageFragment,
  GetPagesGql,
  GetPagesQuery,
  GetPagesQueryVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { Page } from '../../page.model'
import { GetPagesInput } from './get-pages.input'

type GqlVariablesType = GetPagesQueryVariables
type GqlOperationType = GetPagesQuery

@Injectable()
export class GetPagesService extends QueryUseCase<
  GetPagesInput,
  Array<Partial<Page>>,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(apollo: ApolloClientService) {
    super(apollo)
  }

  protected getGql() {
    return GetPagesGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return (
      (result.data?.getApp?.pages?.filter(
        (p): p is Dgraph__PageFragment => !!p,
      ) as any) || []
    )
  }

  protected getVariables(request: GetPagesInput): GqlVariablesType {
    return {
      appId: request.appId,
    }
  }
}
