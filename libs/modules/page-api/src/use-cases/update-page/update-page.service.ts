import { FetchResult } from '@apollo/client'
import { ApolloClientService, MutationUseCase } from '@codelab/backend'
import {
  UpdatePageGql,
  UpdatePageMutation,
  UpdatePageMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { PageGuardService } from '../../auth'
import { Page, pageSchema } from '../../page.model'
import { UpdatePageRequest } from './update-page.request'

type GqlVariablesType = UpdatePageMutationVariables
type GqlOperationType = UpdatePageMutation

@Injectable()
export class UpdatePageService extends MutationUseCase<
  UpdatePageRequest,
  Partial<Page>,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    apollo: ApolloClientService,
    private pageGuardService: PageGuardService,
  ) {
    super(apollo)
  }

  protected getGql() {
    return UpdatePageGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return pageSchema
      .array()
      .nonempty()
      .parse(result?.data?.updatePage?.page)[0]
  }

  protected async getVariables({
    input: { pageId, updateData },
  }: UpdatePageRequest): Promise<GqlVariablesType> {
    return {
      input: {
        filter: {
          id: [pageId],
        },
        set: {
          app: {
            id: updateData.appId,
          },
          name: updateData.name,
        },
      },
    }
  }

  protected async validate({
    currentUser,
    input: { pageId },
  }: UpdatePageRequest): Promise<void> {
    await this.pageGuardService.validate(pageId, currentUser)
  }
}
