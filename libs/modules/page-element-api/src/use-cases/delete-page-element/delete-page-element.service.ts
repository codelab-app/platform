import { FetchResult } from '@apollo/client'
import {
  ApolloClientService,
  DeleteResponse,
  MutationUseCase,
} from '@codelab/backend'
import {
  DeletePageElementGql,
  DeletePageElementMutation,
  DeletePageElementMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { GetPageElementParentService } from '../get-page-element-parent'
import { GetPageElementRootService } from '../get-page-element-root'
import { DeletePageElementInput } from './delete-page-element.input'

type GqlVariablesType = DeletePageElementMutationVariables
type GqlOperationType = DeletePageElementMutation

@Injectable()
/**
 * Deletes a page element and all the descending page elements
 */
export class DeletePageElementService extends MutationUseCase<
  DeletePageElementInput,
  DeleteResponse,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    apollo: ApolloClientService,
    private getPageElementRootService: GetPageElementRootService,
    private getPageElementParentService: GetPageElementParentService,
  ) {
    super(apollo)
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

  protected async getVariables(
    request: DeletePageElementInput,
  ): Promise<GqlVariablesType> {
    //Don't delete it if its the root page element
    //We know that only the root page element doesn't have a parent and we validate that's the case when creating and updating the page elemenet
    //so we can use that to check if this is a page root
    const parent = await this.getPageElementParentService.execute({
      pageElementId: request.pageElementId,
    })

    if (!parent) {
      throw new Error("Can't delete root page element")
    }

    //Get all descending page elements and delete them too
    const root = await this.getPageElementRootService.execute({
      pageElementId: request.pageElementId,
    })

    const idsToDelete = [request.pageElementId]

    if (root && root.descendants && root.descendants.length) {
      root.descendants.forEach((descendant) => idsToDelete.push(descendant.id))
    }

    return {
      filter: {
        id: idsToDelete,
      },
    }
  }
}
