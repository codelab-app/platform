import { FetchResult } from '@apollo/client'
import { ApolloClientService, QueryUseCase } from '@codelab/backend'
import {
  Dgraph__PageFragment,
  GetPagesGql,
  GetPagesQuery,
  GetPagesQueryVariables,
} from '@codelab/dgraph'
import { AppGuardService } from '@codelab/modules/app-api'
import { Injectable } from '@nestjs/common'
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
    apollo: ApolloClientService,
    private appGuardService: AppGuardService,
  ) {
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
