import { DgraphEntityType, DgraphRepository } from '@codelab/backend/infra'
import type { IUser } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ElementValidator {
  constructor(private dgraph: DgraphRepository) {}

  /**
   * Throws error
   * if the element doesn't exist
   * if no currentUser is not provided
   * if the currentUser doesn't have ownership rights over the element
   */
  async existsAndIsOwnedBy(elementId?: string, currentUser?: IUser) {
    if (!elementId || elementId === 'undefined') {
      throw new Error('elementId not provided')
    }

    if (!currentUser) {
      throw new Error("You don't have access to this element")
    }

    const res = await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.executeQuery<{
        owner?: { ownerId?: string }
        element?: { id: string }
      }>(
        txn,
        `{
            var(func: type(${DgraphEntityType.Element})) @filter(uid(${elementId}))  @recurse {
              OWNER as owner
              ~children
              ~root
              ~pages
            }

            element(func: type(${DgraphEntityType.Element})) @filter(uid(${elementId})){
              id: uid
            }

            owner(func: uid(OWNER)) @filter(type(${DgraphEntityType.User})) {
              ownerId: uid
            }
          }`,
      ),
    )

    const { owner, element } = res

    if (!element) {
      throw new Error("Element doesn't exist")
    }

    // If the element doesn't have an ownerId consider it valid for any user to access it
    if (!owner?.ownerId) {
      return res
    }

    if (owner.ownerId !== currentUser.id) {
      throw new Error("You don't have access to this element")
    }

    return res
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
    // TODO validate props string, could use TypeTree.toJsonSchema?
  }

  /**
   * Throws error
   * if the element is the root element of its tree
   */
  async isNotRoot(elementId: string) {
    if (!elementId) {
      throw new Error('elementId not provided')
    }

    const response = await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.getOneNamed<{ containerId?: string }>(
        txn,
        `{
          query(func: type(Element)) @normalize {
            ~root {
              containerId: uid
            }
          }
        }`,
        'query',
      ),
    )

    if (response?.containerId) {
      throw new Error('Element is root')
    }

    return response
  }

  /**
   * Throws error
   * if the element has a parent element
   */
  public async isOrphan(elementId: string) {
    if (!elementId) {
      throw new Error('elementId not provided')
    }

    const response = await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.getOneNamed<{ parentId?: string }>(
        txn,
        `{
          query(func: type(${DgraphEntityType.Element})) @normalize @filter(uid(${elementId})) {
            ~children {
              parentId: uid
            }
          }
        }`,
        'query',
      ),
    )

    if (response?.parentId) {
      throw new Error('Element is referenced')
    }

    return response
  }
}
