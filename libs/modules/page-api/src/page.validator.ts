import {
  DgraphApp,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphQueryField,
  DgraphRepository,
  JwtPayload,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'

interface QueryResult {
  '~pages': [{ uid: string; ownerId: string }]
}

@Injectable()
export class PageValidator {
  constructor(private dgraph: DgraphRepository) {}

  /**
   * Throws error
   * if the page doesn't exist
   * if the current user doesn't have ownership access to the page
   */
  async existsAndIsOwnedBy(pageId: string, currentUser?: JwtPayload) {
    const result = await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.getOneOrThrow<QueryResult>(
        txn,
        this.createGetOwnerRequest(pageId),
        () => new Error('Page not found'),
      ),
    )

    if (
      !currentUser ||
      !result['~pages'][0] ||
      result['~pages'][0].ownerId !== currentUser.sub
    ) {
      throw new Error("You don't have access to this page")
    }

    return {
      appId: result['~pages'][0].uid,
      ownerId: result['~pages'][0].ownerId,
    }
  }

  private createGetOwnerRequest(pageId: string) {
    /**
     * {
        query(func: uid(0x2711))  {
          uids: uid
          dgraph.type
          ~pages {
            uid
            ownerId
          }
        }
      }
     */
    return new DgraphQueryBuilder()
      .setUidFunc(pageId)
      .addTypeFilterDirective(DgraphEntityType.Page)
      .addBaseFields()
      .addFields(
        new DgraphQueryField('~pages')
          .addBaseInnerFields()
          .addJsonFields<DgraphApp>({
            ownerId: true,
          }),
      )
  }
}
