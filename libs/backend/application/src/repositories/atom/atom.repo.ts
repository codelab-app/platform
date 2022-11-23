import {
  atoms,
  atomSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { Atom, GetAtomsQueryVariables } from '@codelab/shared/abstract/codegen'
import { int, Transaction } from 'neo4j-driver'

export const atomRepository = {
  /**
   * Used for field resolver on atom
   */
  atoms: async (
    txn: Transaction,
    params: GetAtomsQueryVariables,
  ): Promise<Array<Atom>> => {
    const limit = params.options?.limit ?? 10
    const offset = params.options?.offset ?? 0
    const AtomInstance = await Repository.instance.Atom

    /**
     * We can still use the same query, but we get ID from context instead
     */
    const { records: atomsRecords } = await txn.run(atoms, {
      limit: int(limit),
      skip: int(offset),
    })

    const items = await Promise.all(
      atomsRecords
        .map(async (record) => {
          const atom = record.get('atom').properties

          return (
            await AtomInstance.find({
              where: { id: atom.id },
              selectionSet: atomSelectionSet,
            })
          )[0]
        })
        .filter(Boolean) as Array<Promise<Atom>>,
    )

    return items
  },
}
