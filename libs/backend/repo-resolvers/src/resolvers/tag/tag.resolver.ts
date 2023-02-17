import { tagRepository } from '@codelab/backend/domain/tag'
import type { Transaction } from 'neo4j-driver'

export const tagDescendants =
  (parent: { id: string }) => (txn: Transaction) => {
    return tagRepository.getDescendants(txn, parent.id)
  }
