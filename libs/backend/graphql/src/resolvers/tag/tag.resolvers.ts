import { tagRepository } from '@codelab/backend/application'
import type { Transaction } from 'neo4j-driver'

export const tagDescendants =
  (parent: { id: string }) => (txn: Transaction) => {
    return tagRepository.getDescendants(txn, parent.id)
  }
