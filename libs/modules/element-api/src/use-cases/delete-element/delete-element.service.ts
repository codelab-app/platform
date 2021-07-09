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
  DeleteElementGql,
  DeleteElementMutation,
  DeleteElementMutationVariables,
} from '@codelab/codegen/dgraph'
import { GetPropAggregatesService } from '@codelab/modules/prop-api'
import { Inject, Injectable } from '@nestjs/common'
import * as _ from 'lodash'
import { ElementGuardService } from '../../auth'
import { FlattenElementTreeService } from '../flatten-element-tree'
import { GetDgraphElementAggregateService } from '../get-element-aggregate'
import { DeleteElementRequest } from './delete-element.request'

type GqlVariablesType = DeleteElementMutationVariables
type GqlOperationType = DeleteElementMutation

@Injectable()
/**
 * Deletes a element and all the descending elements
 */
export class DeleteElementService extends MutationUseCase<
  DeleteElementRequest,
  DeleteResponse,
  GqlOperationType,
  GqlVariablesType
> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    protected apolloClient: ApolloClient<NormalizedCacheObject>,
    private getElementAggregateService: GetDgraphElementAggregateService,
    private elementGuardService: ElementGuardService,
    private flattenElementTreeService: FlattenElementTreeService,
    private getPropAggregatesService: GetPropAggregatesService,
  ) {
    super(apolloClient)
  }

  protected getGql() {
    return DeleteElementGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    const affected = result?.data?.deleteElement?.numUids || 0

    return {
      affected,
    }
  }

  protected async mapVariables({
    input: { elementId },
    currentUser,
  }: DeleteElementRequest): Promise<GqlVariablesType> {
    const element = await this.getElementAggregateService.execute({
      input: { elementId },
      currentUser,
    })

    if (!element) {
      throw new Error('Element not found')
    }

    // Don't delete it if its the root page element
    // If this element is owned by a page, we can compare the root element of the page with the id of the deleted element
    if (
      element['Element.ownedBy'] &&
      element['Element.ownedBy']['Page.rootElement']
    ) {
      const pageRootElementId =
        element['Element.ownedBy']['Page.rootElement'].uid

      if (pageRootElementId == elementId) {
        throw new Error("Can't delete root page element")
      }
    }

    // Get all descending elements and delete them too
    // this  can be done faster using an upsert block, but it's more complex
    // https://dgraph.io/docs/mutations/upsert-block/#example-of-uid-function
    const idsToDelete = [elementId]

    const { descendants } = await this.flattenElementTreeService.execute({
      root: element,
    })

    if (descendants && descendants.length) {
      descendants.forEach((descendant) => idsToDelete.push(descendant.id))
    }

    // Delete all the props too
    const props = await this.getPropAggregatesService.execute({
      byElement: { elementIds: [elementId, ...descendants.map((d) => d.id)] },
    })

    return {
      filter: {
        id: idsToDelete,
      },
      propsFilter: {
        id: _.flatMap(props, (prop) => prop.props.map((p) => p.id)),
      },
    }
  }

  protected async validate({
    currentUser,
    input: { elementId },
  }: DeleteElementRequest): Promise<void> {
    await this.elementGuardService.validate(elementId, currentUser)
  }
}
