import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import { ApolloClientTokens, MutationUseCase } from '@codelab/backend'
import {
  UpdatePageGql,
  UpdatePageMutation,
  UpdatePageMutationVariables,
} from '@codelab/dgraph'
import { Inject, Injectable } from '@nestjs/common'
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
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private pageGuardService: PageGuardService,
  ) {
    super(apolloClient)
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

  protected async mapVariables({
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
