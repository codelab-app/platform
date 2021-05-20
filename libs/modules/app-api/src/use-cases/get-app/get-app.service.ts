import { FetchResult } from '@apollo/client'
import { ApolloClientService, QueryUseCase } from '@codelab/backend'
import { GetAppGql, GetAppQuery, GetAppQueryVariables } from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { App } from '../../app.model'
import { GetAppInput } from './get-app.input'

@Injectable()
export class GetAppService extends QueryUseCase<
  GetAppInput,
  App | null,
  GetAppQuery,
  GetAppQueryVariables
> {
  constructor(apollo: ApolloClientService) {
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

  protected getVariables(request: GetAppInput): GetAppQueryVariables {
    return {
      id: request.appId,
    }
  }
}
