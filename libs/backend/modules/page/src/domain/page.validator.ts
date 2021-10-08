import { DgraphRepository } from '@codelab/backend/infra'
import type { IUser } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

export interface QueryResult {
  ownerId: string
  appId: string
}

@Injectable()
export class PageValidator {
  constructor(private dgraph: DgraphRepository) {}

  /**
   * Throws error
   * if the page doesn't exist
   * if the current user doesn't have ownership access to the page
   */
  async existsAndIsOwnedBy(pageId: string, currentUser?: IUser) {
    const result = await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.getOneOrThrowNamed<QueryResult>(
        txn,
        PageValidator.createGetOwnerRequest(pageId),
        'query',
        () => new Error('Page not found'),
      ),
    )

    if (!currentUser || result.ownerId !== currentUser.id) {
      throw new Error("You don't have access to this page")
    }

    return result
  }

  private static createGetOwnerRequest(pageId: string) {
    return `{
        query(func: uid(${pageId})) @filter(type(Page)) @normalize  {
          ~pages @filter(type(App)) {
            appId: uid
            owner {
              ownerId: uid
            }
          }
        }
      }`
  }
}
