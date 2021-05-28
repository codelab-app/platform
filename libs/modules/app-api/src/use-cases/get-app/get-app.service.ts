import { FetchResult } from '@apollo/client'
import { ApolloClientService, QueryUseCase } from '@codelab/backend'
import { GetAppGql, GetAppQuery, GetAppQueryVariables } from '@codelab/dgraph'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { App } from '../../app.model'
import { AppGuardService } from '../../auth'
import { GetAppRequest } from './get-app.request'

@Injectable()
export class GetAppService extends QueryUseCase<
  GetAppRequest,
  App | null,
  GetAppQuery,
  GetAppQueryVariables
> {
  constructor(
    apollo: ApolloClientService,
    private appGuardService: AppGuardService,
  ) {
    super(apollo)
  }

  protected extractDataFromResult(
    result: FetchResult<GetAppQuery>,
  ): App | null {
    const app = result?.data?.app

    return app || null
  }

  protected getGql() {
    return GetAppGql
  }

  protected getVariables({ input }: GetAppRequest): GetAppQueryVariables {
    return {
      id: input.appId,
    }
  }

  protected async validate({
    input: { appId },
    currentUser,
  }: GetAppRequest): Promise<void> {
    await this.appGuardService.validate(appId, currentUser)
  }
}
