import { FetchResult } from '@apollo/client'
import { ApolloClientService, MutationUseCase } from '@codelab/backend'
import {
  UpdateAppGql,
  UpdateAppMutation,
  UpdateAppMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { App } from '../../app.model'
import { UpdateAppInput } from './update-app.input'

@Injectable()
export class UpdateAppService extends MutationUseCase<
  UpdateAppInput,
  App,
  UpdateAppMutation,
  UpdateAppMutationVariables
> {
  constructor(apollo: ApolloClientService) {
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
    appId,
    ...data
  }: UpdateAppInput): UpdateAppMutationVariables {
    return {
      input: {
        filter: {
          id: [appId],
        },
        set: {
          name: data.name,
        },
      },
    }
  }
}
