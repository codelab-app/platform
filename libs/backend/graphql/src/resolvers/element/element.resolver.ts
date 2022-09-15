import { elementRepository } from '@codelab/backend/application'
import { Transaction } from 'neo4j-driver'

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
 *
 * Used `ITxnResolver<{ id: string }>` before, but new signature is more flexible
 */
export const elementDescendants =
  (parent: { id: string }) => (txn: Transaction) => {
    return elementRepository.getDescendants(txn, parent.id)
  }
