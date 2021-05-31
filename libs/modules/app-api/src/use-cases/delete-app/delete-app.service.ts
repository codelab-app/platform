import { ApolloClientService, MutationUseCase } from '@codelab/backend'
import {
  DeleteAppGql,
  DeleteAppMutation,
  DeleteAppMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { FetchResult } from 'apollo-link'
import { App } from '../../app.model'
import { AppGuardService } from '../../auth'
import { DeleteAppRequest } from './delete-app.request'

@Injectable()
export class DeleteAppService extends MutationUseCase<
  DeleteAppRequest,
  App,
  DeleteAppMutation,
  DeleteAppMutationVariables
> {
  constructor(
    apollo: ApolloClientService,
    // TODO: Make guard into a decorator
    private appGuardService: AppGuardService,
  ) {
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

  protected mapVariables({
    input: { appId },
  }: DeleteAppRequest): DeleteAppMutationVariables {
    return {
      filter: {
        id: [appId],
      },
    }
  }

  protected async validate({
    input: { appId },
    currentUser,
  }: DeleteAppRequest): Promise<void> {
    await this.appGuardService.validate(appId, currentUser)
  }
}
