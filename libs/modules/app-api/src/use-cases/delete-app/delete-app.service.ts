import { ApolloClientService, MutationUseCase } from '@codelab/backend'
import {
  DeleteAppGql,
  DeleteAppMutation,
  DeleteAppMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { FetchResult } from 'apollo-link'
import { App } from '../../app.model'
import { DeleteAppInput } from './delete-app.input'

@Injectable()
export class DeleteAppService extends MutationUseCase<
  DeleteAppInput,
  App,
  DeleteAppMutation,
  DeleteAppMutationVariables
> {
  constructor(apollo: ApolloClientService) {
    super(apollo)
  }

  protected extractDataFromResult(result: FetchResult<DeleteAppMutation>): App {
    const app = result?.data?.deleteApp?.app

    if (!app || !app.length || !app[0]) {
      throw new Error('App not found')
    }

    return app[0]
  }

  protected getGql() {
    return DeleteAppGql
  }

  protected getVariables(request: DeleteAppInput): DeleteAppMutationVariables {
    return {
      filter: {
        id: [request.appId],
      },
    }
  }
}
