import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, QueryUseCase } from '@codelab/backend'
import {
  Dgraph__PageFragment,
  GetPagesGql,
  GetPagesQuery,
  GetPagesQueryVariables,
} from '@codelab/codegen/dgraph'
import { AppGuardService } from '@codelab/modules/app-api'
import { Inject, Injectable } from '@nestjs/common'
import { Page } from '../../page.model'
import { GetPagesRequest } from './get-pages.request'

type GqlVariablesType = GetPagesQueryVariables
type GqlOperationType = GetPagesQuery

@Injectable()
export class GetPagesService extends QueryUseCase<
  GetPagesRequest,
  Array<Partial<Page>>,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private appGuardService: AppGuardService,
  ) {
    super(apolloClient)
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

  protected mapVariables({
    input: { appId },
  }: GetPagesRequest): GqlVariablesType {
    return {
      appId: appId,
    }
  }

  protected async validate({
    input: { appId },
    currentUser,
  }: GetPagesRequest): Promise<void> {
    await this.appGuardService.validate(appId, currentUser)
  }
}
