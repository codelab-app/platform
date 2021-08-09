import {
  DgraphApp,
  DgraphElement,
  DgraphEntity,
  DgraphQueryBuilder,
  DgraphRepository,
  DgraphTree,
  isDgraphComponent,
  isDgraphPage,
  JwtPayload,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'

@Injectable()
/**
 * Validates that an element exists and that is owner by the current user
 */
export class ElementValidator {
  constructor(private dgraph: DgraphRepository) {}

  /**
   * Throws error
   * if the element doesn't exist
   * if no currentUser is not provided
   * if the currentUser doesn't have ownership rights over the element
   */
  async existsAndIsOwnedBy(elementId?: string, currentUser?: JwtPayload) {
    if (!elementId) {
      throw new Error('elementId not provided')
    }

    const response = await this.query(elementId)

    if (!response || !response.found) {
      throw new Error('Element does not exist')
    }

    // If the element doesn't have an ownerId consider it valid for any user to access it
    if (response.ownerId && response.ownerId !== currentUser?.sub) {
      throw new Error("You don't have access to this element")
    }

    return response
  }

  /**
   * Throws error
   * if the provided props don't match the interface of the element's atom
   */
  async propsAreValid(elementId: string, props: string) {
    // const element =
    //   typeof elementOrId === 'string'
    //     ? await this.query(elementOrId)
    //     : elementOrId
    // TODO validate props string
  }

  /**
   * Throws error
   * if the element is the root element of its tree
   */
  async isNotRoot(elementId: string) {
    if (!elementId) {
      throw new Error('elementId not provided')
    }

    const response = await this.query(elementId)

    if (
      response.found &&
      response.tree &&
      response.root &&
      response.root.uid === elementId
    ) {
      throw new Error('Element is root')
    }

    return response
  }

  protected async query(elementId: string): Promise<{
    found: boolean
    tree?: QueryResult
    ownerId?: string
    root?: QueryResult
    element?: QueryResult
  }> {
    const result = await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.getOne<QueryResult>(txn, this.createQuery(elementId)),
    )

    if (!result) {
      return { found: false }
    }

    let tree: QueryResult | undefined
    let root: QueryResult | undefined

    // Go through each node up until we find a tree
    const visit = (node: QueryResult) => {
      if (node['~root'] && node['~root'].length) {
        tree = node['~root'][0]
        root = node

        return
      }

      if (node['~children'] && node['~children'].length) {
        node['~children'].forEach(visit)
      }
    }

    visit(result)

    if (!tree) {
      return { found: true, element: result }
    }

    if (
      (isDgraphPage(tree) as QueryResult) &&
      tree['~pages'] &&
      tree['~pages'][0] &&
      tree['~pages'][0].ownerId
    ) {
      return {
        found: true,
        tree,
        root,
        element: result,
        ownerId: tree['~pages'][0].ownerId as string,
      }
    } else if (isDgraphComponent(tree)) {
      // TODO change element validator when adding component ownership logic
      return {
        found: true,
        tree,
        root,
        element: result,
        ownerId: undefined,
      }
    } else {
      throw new Error('Unknown tree type ' + tree['dgraph.type'])
    }
  }

  private createQuery(elementId: string) {
    // We need the id of the tree which has this element
    return new DgraphQueryBuilder()
      .addBaseFields()
      .addRecurseDirective()
      .addJsonFields<DgraphElement & DgraphApp>({
        name: true,
        ownerId: true,
        props: true,
        atom: true,
      })
      .addJsonReverseFields<DgraphTree<any, any> & DgraphElement & DgraphApp>({
        '~root': true,
        '~children': true,
        '~pages': true,
      })
      .setUidFunc(elementId)
  }
}

type QueryResult = {
  '~children'?: Array<QueryResult>
  '~root'?: [QueryResult]
  name?: string
  ownerId?: string
  '~pages'?: [QueryResult]
} & DgraphEntity<any> &
  Pick<DgraphElement, 'atom'>
