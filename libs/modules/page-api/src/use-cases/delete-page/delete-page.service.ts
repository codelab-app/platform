import { FetchResult } from '@apollo/client'
import { ApolloClientService, MutationUseCase } from '@codelab/backend'
import {
  DeletePageGql,
  DeletePageMutation,
  DeletePageMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { PageGuardService } from '../../auth'
import { Page, pageSchema } from '../../page.model'
import { DeletePageRequest } from './delete-page.request'

type GqlVariablesType = DeletePageMutationVariables
type GqlOperationType = DeletePageMutation

@Injectable()
export class DeletePageService extends MutationUseCase<
  DeletePageRequest,
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
    return DeletePageGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    return pageSchema
      .array()
      .nonempty()
      .parse(result?.data?.deletePage?.page)[0]
  }

  protected getVariables(request: DeletePageRequest): GqlVariablesType {
    const { pageId } = request.input

    return {
      filter: {
        id: [pageId],
      },
    }
  }

  protected async validate({
    currentUser,
    input: { pageId },
  }: DeletePageRequest): Promise<void> {
    await this.pageGuardService.validate(pageId, currentUser)
  }
}
