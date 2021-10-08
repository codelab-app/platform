import { DgraphEntityType, DgraphRepository } from '@codelab/backend/infra'
import type { IApp, IUser } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

/**
 * Validates that the app exists and is owned by this user
 */
@Injectable()
export class AppValidator {
  constructor(private dgraph: DgraphRepository) {}

  /**
   * Throws error
   * if the app doesn't exists
   * or if there's no current user
   * or if the current user doesn't own the app
   */
  async existsAndIsOwnedBy(appId: string, currentUser?: IUser) {
    const app = await this.getApp(appId)

    if (!app) {
      throw new Error('App does not exist')
    }

    await this.isOwnedBy(app, currentUser)
  }

  /**
   * Throws error
   * - if there's no current user
   * - if the current user doesn't own the app
   */
  isOwnedBy(app: Pick<IApp, 'ownerId'>, currentUser?: IUser) {
    if (!currentUser || app.ownerId !== currentUser.id) {
      throw new Error("You don't have access to this app")
    }
  }

  // We're not using GetAppService, because it will cause circular dependency
  protected async getApp(appId: string): Promise<IApp> {
    return this.dgraph.transactionWrapper(async (txn) => {
      return await this.dgraph.getOneOrThrowNamed<IApp>(
        txn,
        `{
            query(func: type(${DgraphEntityType.App})) @filter(uid(${appId})) @normalize {
                id: uid
                owner {
                   ownerId: uid
                }
                name: name
            }
        }`,
        'query',
      )
    })
  }
}
