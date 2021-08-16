import {
  DgraphCreateMutationJson,
  DgraphEntityType,
  DgraphTagTree,
  DgraphUseCase,
  jsonMutation,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTagGraphService } from '../get-tag-graph'
import { SeedTagTreeRequest } from './seed-tag-tree.request'

@Injectable()
/**
 * When a new user is created, we'll seed the TagTree along with a root tag which all future tags will be descendents to
 */
export class SeedTagTreeService extends DgraphUseCase<any, any> {
  /**
   * Name of the Tag root, will be created via seed once.
   */
  static __TAG_ROOT = '__TAG_ROOT'

  protected async executeTransaction(request: SeedTagTreeRequest, txn: Txn) {
    const results = await this.validate(request)

    // console.log(results)

    await this.dgraph.executeMutation(
      txn,
      SeedTagTreeService.createTagTreeMutation(request),
    )
  }

  private static createTagTreeMutation(request: SeedTagTreeRequest) {
    const { owner } = request

    const createJson: DgraphCreateMutationJson<DgraphTagTree> = {
      uid: '_:tagTree',
      ownerId: owner.sub,
      'dgraph.type': [DgraphEntityType.Tree, DgraphEntityType.TagTree],
      root: {
        name: SeedTagTreeService.__TAG_ROOT,
        ownerId: owner.sub,
        'dgraph.type': [DgraphEntityType.Node, DgraphEntityType.Tag],
        children: [],
      },
    }

    return jsonMutation<DgraphTagTree>(createJson)
  }

  // private async tagRootExists(request: SeedTagTreeRequest) {
  //   const results = await this.dgraph.transactionWrapper((txn) =>
  //     this.dgraph.executeQuery(txn, GetTagTreeService.createQuery(request)),
  //   )
  //
  //   return results.root.name === SeedTagTreeService.__TAG_ROOT
  // }

  private async validate(request: SeedTagTreeRequest) {
    return this.dgraph.transactionWrapper((txn) =>
      this.dgraph.executeQuery(txn, GetTagGraphService.createQuery(request)),
    )
  }
}
