import { FetchResult } from '@apollo/client'
import { ApolloClientService, MutationUseCase } from '@codelab/backend'
import {
  CreatePageGql,
  CreatePageMutation,
  CreatePageMutationVariables,
} from '@codelab/dgraph'
import { AppGuardService } from '@codelab/modules/app-api'
import { Injectable } from '@nestjs/common'
import { Page, pagesSchema } from '../../page.model'
import { CreatePageRequest } from './create-page.request'

@Injectable()
export class CreatePageService extends MutationUseCase<
  CreatePageRequest,
  Partial<Page>,
  CreatePageMutation,
  CreatePageMutationVariables
> {
  constructor(
    apollo: ApolloClientService,
    private appGuardService: AppGuardService,
  ) {
    super(apollo)
  }

  protected extractDataFromResult(result: FetchResult<CreatePageMutation>) {
    return pagesSchema.parse(result?.data?.addPage?.page)[0]
  }

  protected getGql() {
    return CreatePageGql
  }

  protected getVariables({
    input: { name, appId },
  }: CreatePageRequest): CreatePageMutationVariables {
    //Create the page + a root page element, so we know we always have at least one element
    return {
      input: {
        name: name,
        app: {
          id: appId,
        },
        rootElement: {
          name: 'Page Root',
        },
      },
    }
  }

  protected async validate({
    currentUser,
    input: { appId },
  }: CreatePageRequest): Promise<void> {
    await this.appGuardService.validate(appId, currentUser)
  }
}
