import { atomRepository } from '@codelab/backend/domain/atom'
import type { GetAtomsQueryVariables } from '@codelab/shared/abstract/codegen'
import type { Transaction } from 'neo4j-driver'

export const atoms =
  (_: unknown, params: GetAtomsQueryVariables) => (txn: Transaction) =>
    atomRepository.atoms(txn, params)
