import { IRxTxnResolver, ITxnResolver } from '@codelab/backend/adapter/neo4j'
import { elementRepository } from '@codelab/backend/application'
import { QueryElementGraphArgs } from '@codelab/shared/abstract/codegen'

/**
 * This is a standalone version that gets elementGraph when giving an id. But would be better if we integrated this into the current page tree
 *
 * but would be better if we receive id from parent context of rootElement
 *
 */
export const elementGraph: IRxTxnResolver<any, any, QueryElementGraphArgs> =
  (parent, args) => (txn) => {
    return elementRepository.getElementGraph(txn, args.input.rootId)
  }

/**
 * We can re-use the same repository, since it just takes an id and get the descendants. The only difference here is that our ID comes from parent context as opposed to argument
 *
 * We've created a new repo only to use promise
 *
 * {
 *   rootElement {
 *     id  # <-- Comes from here instead
 *     descendantElements {
 *      id
 *     }
 *   }
 * }
 */
export const elementDescendants: ITxnResolver<{ id: string }> =
  (parent) => (txn) => {
    return elementRepository.getDescendants(txn, parent.id)
  }
