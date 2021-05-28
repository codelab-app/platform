import { FetchResult } from '@apollo/client'
import { ApolloClientService, MutationUseCase } from '@codelab/backend'
import {
  UpdateAppGql,
  UpdateAppMutation,
  UpdateAppMutationVariables,
} from '@codelab/dgraph'
import { Injectable, UnauthorizedException } from '@nestjs/common'
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
    apollo: ApolloClientService,
    private appGuardService: AppGuardService,
  ) {
    super(apollo)
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

  protected getVariables({
    input: { appId, updateData },
  }: UpdateAppRequest): UpdateAppMutationVariables {
    return {
      input: {
        filter: {
          id: [appId],
        },
        set: {
          name: updateData.name,
        },
      },
    }
  }

  protected async validate({
    input: { appId },
    currentUser,
  }: UpdateAppRequest): Promise<void> {
    await this.appGuardService.validate(appId, currentUser)
  }
}
