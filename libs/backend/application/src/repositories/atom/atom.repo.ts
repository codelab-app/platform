import {
  atomSelectionSet,
  getAtoms,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { int, Transaction } from 'neo4j-driver'

export const atomRepository = {
  /**
   * Used for field resolver on atom
   */
  // TODO: find the types for inputs and outputs
  getAtoms: async (txn: Transaction, params: unknown): Promise<unknown> => {
    console.log('getAtoms', params)

    // TODO: FIX THIS TYPE
    const { limit, offset } = (
      params as { options: { limit: number; offset: number } }
    ).options

    const Atom = await Repository.instance.Atom

    /**
     * We can still use the same query, but we get ID from context instead
     */
    const { records: getAtomsRecords } = await txn.run(getAtoms, {
      limit: int(limit),
      skip: int(offset),
    })

    console.log('At atoms.repo executing a cypher, result: ', getAtomsRecords)

    const totalCountRecord = getAtomsRecords[0]?.get('totalCount')
    const totalCount = totalCountRecord ? int(totalCountRecord).toNumber() : 0

    const items = await Promise.all(
      getAtomsRecords.map(async (record) => {
        const atom = record.get('atom').properties

        console.log('will find item with atom id: ', atom.id)

        const foundAtom = await Atom.find({
          where: { id: atom.id },
          selectionSet: atomSelectionSet,
        })

        console.log('foundAtom: ', foundAtom)

        return foundAtom[0]
      }),
    )

    console.log('found items: ', items)

    return {
      items,
      totalCount,
    }
  },
}
