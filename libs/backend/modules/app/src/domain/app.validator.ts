import {
  DgraphApp,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphRepository,
  JwtPayload,
} from '@codelab/backend/infra'
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
  async existsAndIsOwnedBy(appId: string, currentUser?: JwtPayload) {
    const app = await this.getApp(appId)

    if (!app) {
      throw new Error('App does not exist')
    }

    await this.isOwnedBy(app, currentUser)
  }

  /**
   * Throws error
   * if there's no current user
   * or if the current user doesn't own the app
   */
  isOwnedBy(app: DgraphApp, currentUser?: JwtPayload) {
    if (!currentUser || app.ownerId !== currentUser.sub) {
      throw new Error("You don't have access to this app")
    }
  }

  protected async getApp(appId: string): Promise<DgraphApp> {
    return this.dgraph.transactionWrapper(async (txn) => {
      return await this.dgraph.getOneOrThrow<DgraphApp>(
        txn,
        new DgraphQueryBuilder()
          .setUidFunc(appId)
          .addTypeFilterDirective(DgraphEntityType.App)
          .addBaseFields()
          .addExpandAll(),
      )
    })
  }
}
