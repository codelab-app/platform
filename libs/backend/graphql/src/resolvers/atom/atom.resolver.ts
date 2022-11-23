import { atomRepository } from '@codelab/backend/application'
import { Transaction } from 'neo4j-driver'

/**
 */
export const getAtoms = (_: unknown, params: unknown) => (txn: Transaction) => {
  console.log('at atom resolver with params: ', params)

  return atomRepository.getAtoms(txn, params)
}
