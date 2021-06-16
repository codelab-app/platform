import {
  ApolloClient,
  FetchResult,
  NormalizedCacheObject,
} from '@apollo/client'
import {
  ApolloClientTokens,
  DeleteResponse,
  MutationUseCase,
} from '@codelab/backend'
import {
  DeletePageElementGql,
  DeletePageElementMutation,
  DeletePageElementMutationVariables,
} from '@codelab/dgraph'
import { Inject, Injectable } from '@nestjs/common'
import { PageElementGuardService } from '../../auth'
import { GetPageElementParentService } from '../get-page-element-parent'
import { GetPageElementRootService } from '../get-page-element-root'
import { DeletePageElementRequest } from './delete-page-element.request'

type GqlVariablesType = DeletePageElementMutationVariables
type GqlOperationType = DeletePageElementMutation

@Injectable()
/**
 * Deletes a page element and all the descending page elements
 */
export class DeletePageElementService extends MutationUseCase<
  DeletePageElementRequest,
  DeleteResponse,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private getPageElementRootService: GetPageElementRootService,
    private getPageElementParentService: GetPageElementParentService,
    private pageElementGuardService: PageElementGuardService,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return DeletePageElementGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    const affected = result?.data?.deletePageElement?.numUids || 0

    return {
      affected,
    }
  }

  protected async mapVariables({
    input: { pageElementId },
    currentUser,
  }: DeletePageElementRequest): Promise<GqlVariablesType> {
    // Don't delete it if its the root page element
    // We know that only the root page element doesn't have a parent and we validate that's the case when creating and updating the page elemenet
    // so we can use that to check if this is a page root
    const parent = await this.getPageElementParentService.execute({
      pageElementId: pageElementId,
    })

    if (!parent) {
      throw new Error("Can't delete root page element")
    }

    // Get all descending page elements and delete them too
    // this  can be done faster using an upsert block, but it's more complex
    // https://dgraph.io/docs/mutations/upsert-block/#example-of-uid-function
    const root = await this.getPageElementRootService.execute({
      input: {
        pageElementId: pageElementId,
      },
      currentUser,
    })

    const idsToDelete = [pageElementId]

    if (root && root.descendants && root.descendants.length) {
      root.descendants.forEach((descendant) => idsToDelete.push(descendant.id))
    }

    return {
      filter: {
        id: idsToDelete,
      },
    }
  }

  protected async validate({
    currentUser,
    input: { pageElementId },
  }: DeletePageElementRequest): Promise<void> {
    await this.pageElementGuardService.validate(pageElementId, currentUser)
  }
}
