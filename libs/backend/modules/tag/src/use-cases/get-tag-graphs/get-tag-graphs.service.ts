import { DgraphUseCase } from '@codelab/backend/application'
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
  TagGraph | null
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
            isRoot
            owner
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

  // protected createQuery({ currentUser }: GetTagGraphsRequest) {
  //   return new DgraphQueryBuilder()
  //     .setTypeFunc(DgraphEntityType.Tag)
  //     .addFilterDirective(
  //       `uid_in(owner, ${currentUser.id}) AND eq(isRoot, true)`,
  //     )
  //     .addRecurseDirective()
  //     .addBaseFields()
  //     .addExpandAll()
  // }
}

// query {
//   var(func: uid(0x2812f)) @recurse @normalize {
//     UIDS AS uid
//     name
//     CHILDREN_IDS AS children
//   }
//   vertices(func: uid(UIDS)) @normalize {
//     uid
//     name: name
//   }
//   edges(func: uid(CHILDREN_IDS)) @normalize {
//     parent {
//      source: uid
//     }
//     target: uid
//   }
//   # Get all ids with parents
//   # var(func: uid(0x2812f)) @recurse(depth: 2) @normalize  {
//   #   IDS_WITH_PARENT AS uid
//   #   parent
//   #   children
//   # }
//   # test(func: uid(CHILDREN_IDS)) @recurse(depth: 2) {
//   #   uid
//   # }
// }
