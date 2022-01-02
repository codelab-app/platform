import { DgraphUseCase } from '@codelab/backend/application'
import { Nullable } from '@codelab/shared/abstract/types'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { TagGraph } from '../../domain/tag-graph.model'
import { GetTagGraphsRequest } from './get-tag-graphs.request'

/**
 * Get multiple graphs in a since graph
 */
@Injectable()
export class GetTagGraphsService extends DgraphUseCase<
  GetTagGraphsRequest,
  Nullable<TagGraph>
> {
  protected async executeTransaction(request: GetTagGraphsRequest, txn: Txn) {
    const tagGraph = await this.dgraph.executeQuery<TagGraph>(
      txn,
      this.createQuery(request),
    )

    return tagGraph
  }

  protected createQuery({ currentUser }: GetTagGraphsRequest) {
    return `
      query {
        vertices(func: eq(dgraph.type, Tag))
          @filter(uid_in(owner, ${currentUser.id})
          # No owner means shared
          OR NOT has(owner))
          @recurse @normalize {
            id: uid
            name: name
            isRoot: isRoot
        }
        var(func: eq(dgraph.type, Tag))
          @filter(has(parent))
          @recurse(depth: 2) {
            IDS AS uid
        }
        edges(func: uid(IDS))
          @normalize {
            parent {
              source: uid
            }
            target: uid
        }
      }
    `
  }
}
