import { FetchResult } from '@apollo/client'
import { ApolloClientService, QueryUseCase } from '@codelab/backend'
import { GetAppGql, GetAppQuery, GetAppQueryVariables } from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { App, appSchema } from '../../app.model'
import { GetAppRequest } from './get-app.request'

@Injectable()
export class GetAppService extends QueryUseCase<
  GetAppRequest,
  App | null,
  GetAppQuery,
  GetAppQueryVariables
> {
  constructor(apollo: ApolloClientService) {
    super(apollo)
  }

  protected extractDataFromResult(
    result: FetchResult<GetAppQuery>,
    _: void,
    { currentUser }: GetAppRequest,
  ): App | null {
    const app = appSchema.nullable().parse(result?.data?.app || null)

    //We don't use the appGuard here because it would create a circular dependency
    if (app?.ownerId !== currentUser?.sub) {
      throw new Error("You don't have access to this app")
    }

    return app
  }

  protected getGql() {
    return GetAppGql
  }

  protected getVariables({ input }: GetAppRequest): GetAppQueryVariables {
    return {
      id: input.appId,
    }
  }
}
