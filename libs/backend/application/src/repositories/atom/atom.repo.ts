import {
  atoms,
  atomSelectionSet,
  atomsWithLimit,
  Repository,
  tagSelectionSet,
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
    const limit = params.options?.limit
    const offset = params.options?.offset
    const cypher = limit && offset ? atomsWithLimit : atoms
    const AtomInstance = await Repository.instance.Atom

    /**
     * We can still use the same query, but we get ID from context instead
     */
    const { records: atomsRecords } = await txn.run(cypher, {
      limit: limit ? int(limit) : undefined,
      skip: offset ? int(offset) : undefined,
    })

    const items = await Promise.all(
      atomsRecords
        .map(async (record) => {
          const atom = record.get('atom').properties

          return (
            await AtomInstance.find({
              where: { id: atom.id },
              selectionSet: atomSelectionSet.replace(
                /tags {([a-z]|\s)*}/g,
                `tags ${tagSelectionSet}`,
              ),
            })
          )[0]
        })
        .filter(Boolean) as Array<Promise<Atom>>,
    )

    return items
  },
}
