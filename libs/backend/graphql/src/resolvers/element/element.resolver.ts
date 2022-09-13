import { ITxnResolver } from '@codelab/backend/adapter/neo4j'
import { elementRepository } from '@codelab/backend/application'

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
