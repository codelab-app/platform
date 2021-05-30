import { FetchResult } from '@apollo/client'
import { ApolloClientService, QueryUseCase } from '@codelab/backend'
import {
  Dgraph__AppFragment,
  GetAppsGql,
  GetAppsQuery,
  GetAppsQueryVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { App } from '../../app.model'
import { GetAppsRequest } from './get-apps.request'

@Injectable()
export class GetAppsService extends QueryUseCase<
  GetAppsRequest,
  Array<App>,
  GetAppsQuery,
  GetAppsQueryVariables
> {
  constructor(apollo: ApolloClientService) {
    super(apollo)
  }

  protected extractDataFromResult(
    result: FetchResult<GetAppsQuery>,
  ): Array<App> {
    const apps = result?.data?.apps?.filter(
      (app): app is Dgraph__AppFragment => !!app,
    )

    if (!apps) {
      throw new Error('Error while getting apps')
    }

    return apps
  }

  protected getGql() {
    return GetAppsGql
  }

  protected mapVariables(request: GetAppsRequest): GetAppsQueryVariables {
    return {
      filter: {
        ownerId: { eq: request.ownerId },
      },
    }
  }
}
