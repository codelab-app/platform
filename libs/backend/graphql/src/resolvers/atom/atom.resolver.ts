import { atomRepository } from '@codelab/backend/application'
import { GetAtomsQueryVariables } from '@codelab/shared/abstract/codegen'
import { Transaction } from 'neo4j-driver'

/**
 */
export const atoms =
  (_: unknown, params: GetAtomsQueryVariables) => (txn: Transaction) =>
    atomRepository.atoms(txn, params)
