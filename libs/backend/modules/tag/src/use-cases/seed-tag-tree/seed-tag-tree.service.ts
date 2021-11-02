import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphRepository,
  jsonMutation,
} from '@codelab/backend/infra'
import { TreeService } from '@codelab/shared/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTagGraphService } from '../get-tag-graph'
import { SeedTagTreeRequest } from './seed-tag-tree.request'

@Injectable()
/**
 * When a new user is created, we'll seed the TagTree along with a root tag which all future tags will be descendents to
 *
 * As with all seeders, this operation should be idempotent. Meaning we can call it multiple times without changing state.
 *
 * @return Return existing or created tag root uid
 */
export class SeedTagTreeService extends DgraphUseCase<
  SeedTagTreeRequest,
  string
> {
  /**
   * Name of the Tag root, will be created via seed once.
   */
  static __TAG_ROOT = '__TAG_ROOT'

  constructor(
    protected readonly dgraph: DgraphRepository,
    private getTagGraphService: GetTagGraphService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: SeedTagTreeRequest, txn: Txn) {
    const tagGraph = await this.getTagGraphService.createRootTagQuery(request)

    if (tagGraph) {
      const tree = new TreeService(tagGraph)
      const root = tree.getRootVertex()

      if (root) {
        return root.id
      }
    }

    const { id: tagRootId } = await this.dgraph.create(txn, (blankNodeUid) =>
      SeedTagTreeService.createTagTreeMutation(request, blankNodeUid),
    )

    return tagRootId
  }

  private static createTagTreeMutation(
    request: SeedTagTreeRequest,
    blankNodeUid: string,
  ) {
    const { currentUser } = request

    const createJson = {
      ownerId: currentUser.id,
      'dgraph.type': [DgraphEntityType.TagTree],
      root: {
        uid: blankNodeUid,
        name: SeedTagTreeService.__TAG_ROOT,
        owner: { uid: currentUser.id },
        'dgraph.type': [DgraphEntityType.Tag],
        children: [],
      },
    }

    return jsonMutation(createJson)
  }
}
