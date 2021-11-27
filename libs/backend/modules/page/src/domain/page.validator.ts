import { DgraphEntityType, DgraphRepository } from '@codelab/backend/infra'
import type { IUser } from '@codelab/shared/abstract/core'
import { IApp } from '@codelab/shared/abstract/core'
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

  /**
   * Throws error
   * if the app doesn't exists
   * or if there's no current user
   * or if the current user doesn't own the app
   */
  async validateApp(appId: string, currentUser?: IUser) {
    // This is duplicated logic from AppValidator, but it's necessary to
    // do it here to avoid circular dependency

    const message = `You don't have access to this app`

    if (!currentUser) {
      throw new Error(message)
    }

    const app = await this.getApp(appId)

    if (!app) {
      throw new Error('App does not exist')
    }

    if (app.ownerId !== currentUser.id) {
      throw new Error(message)
    }
  }

  protected async getApp(appId: string): Promise<IApp> {
    return this.dgraph.transactionWrapper(async (txn) => {
      return await this.dgraph.getOneOrThrowNamed<IApp>(
        txn,
        `{
            query(func: type(${DgraphEntityType.App})) @filter(uid(${appId})) @normalize {
                owner {
                   ownerId: uid
                }
            }
        }`,
        'query',
      )
    })
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
