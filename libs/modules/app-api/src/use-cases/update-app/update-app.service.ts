import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, MutationUseCase } from '@codelab/backend'
import {
  UpdateAppGql,
  UpdateAppMutation,
  UpdateAppMutationVariables,
} from '@codelab/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { App } from '../../app.model'
import { AppGuardService } from '../../auth'
import { UpdateAppRequest } from './update-app.request'

@Injectable()
export class UpdateAppService extends MutationUseCase<
  UpdateAppRequest,
  App,
  UpdateAppMutation,
  UpdateAppMutationVariables
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private appGuardService: AppGuardService,
  ) {
    super(apolloClient)
  }

  protected extractDataFromResult(result: FetchResult<UpdateAppMutation>): App {
    const app = result?.data?.updateApp?.app

    if (!app || !app.length || !app[0]) {
      throw new Error('App not found')
    }

    return app[0]
  }

  protected getGql() {
    return UpdateAppGql
  }

  protected mapVariables({
    input: { id, data },
  }: UpdateAppRequest): UpdateAppMutationVariables {
    return {
      input: {
        filter: {
          id: [id],
        },
        set: {
          name: data.name,
        },
      },
    }
  }

  protected async validate({
    input: { id },
    currentUser,
  }: UpdateAppRequest): Promise<void> {
    await this.appGuardService.validate(id, currentUser)
  }
}
