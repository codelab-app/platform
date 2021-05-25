import { FetchResult } from '@apollo/client'
import { ApolloClientService, MutationUseCase } from '@codelab/backend'
import {
  CreatePageGql,
  CreatePageMutation,
  CreatePageMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { Page } from '../../page.model'
import { CreatePageInput } from './create-page.input'

@Injectable()
export class CreatePageService extends MutationUseCase<
  CreatePageInput,
  Partial<Page>,
  CreatePageMutation,
  CreatePageMutationVariables
> {
  constructor(apollo: ApolloClientService) {
    super(apollo)
  }

  protected extractDataFromResult(
    result: FetchResult<CreatePageMutation>,
  ): Partial<Page> {
    const pages = result?.data?.addPage?.page

    if (!pages || !pages.length || !pages[0]) {
      throw new Error('Error while creating page')
    }

    return pages[0]
  }

  protected getGql() {
    return CreatePageGql
  }

  protected getVariables(
    request: CreatePageInput,
  ): CreatePageMutationVariables {
    //Create the page + a root page element, so we know we always have at least one element
    return {
      input: {
        name: request.name,
        app: {
          id: request.appId,
        },
        rootElement: {
          name: 'Page Root',
        },
      },
    }
  }
}
