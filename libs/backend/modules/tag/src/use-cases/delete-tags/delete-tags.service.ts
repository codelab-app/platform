import { DgraphUseCase } from '@codelab/backend/application'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { DeleteTagsRequest } from './delete-tags.request'

@Injectable()
export class DeleteTagsService extends DgraphUseCase<DeleteTagsRequest> {
  protected async executeTransaction(request: DeleteTagsRequest, txn: Txn) {
    const results = await this.createMutation(txn, request)
  }

  private async createMutation(
    txn: Txn,
    { input: { ids } }: DeleteTagsRequest,
  ) {
    console.log(ids)
    /**
     * https://discuss.dgraph.io/t/using-reverse-in-json-syntax/6414/4
     *
     * Our goal is to remove the child tag and unset the children predicate of the parent tag (remove relationships)
     *
     * An upsert seems to be the way
     */

    const uids = ids.join(',')

    const upsert: Mutation = {
      mutation: `
      upsert {
        query {
          # We use a separate parent query without recursion
          parent(func: uid(${uids})) {
            UID as uid
            # Get parent for removing relationship
            PARENT_UID as parent
          }
          descendants(func: uid(${uids})) @recurse {
            # Used for cascade delete
            uid
            DESCENDANT_UID as children
          }
        }
        mutation {
          delete {
            # Unset parent relationship
            uid(PARENT_UID) <children> uid(UID) .
            # Delete child node
            uid(UID) * * .
            uid(DESCENDANT_UID) * * .
          }
        }
      }
    `,
    }

    return this.dgraph.executeMutation(txn, upsert)
  }
}
