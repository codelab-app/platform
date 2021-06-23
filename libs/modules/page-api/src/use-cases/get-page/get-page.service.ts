import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, QueryUseCase } from '@codelab/backend'
import {
  GetPageGql,
  GetPageQuery,
  GetPageQueryVariables,
} from '@codelab/codegen/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { PageGuardService } from '../../auth'
import { Page } from '../../page.model'
import { GetPageRequest } from './get-page.request'

type GqlVariablesType = GetPageQueryVariables
type GqlOperationType = GetPageQuery

@Injectable()
export class GetPageService extends QueryUseCase<
  GetPageRequest,
  Partial<Page> | null,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private pageGuardService: PageGuardService,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return GetPageGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return (result.data?.getPage as any) || null
  }

  protected mapVariables({
    input: { pageId },
  }: GetPageRequest): GqlVariablesType {
    return {
      pageId: pageId,
    }
  }

  protected async validate({
    input: { pageId },
    currentUser,
  }: GetPageRequest): Promise<void> {
    await this.pageGuardService.validate(pageId, currentUser)
  }
}
