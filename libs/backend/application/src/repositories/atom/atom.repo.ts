import {
  atomSelectionSet,
  Repository,
  tagSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { Atom, GetAtomsQueryVariables } from '@codelab/shared/abstract/codegen'
import { Transaction } from 'neo4j-driver'

export const atomRepository = {
  /**
   * Used for field resolver on atom. We customly resolve atoms because
   * the default resolver returns inconsistent results when offset and
   * limit options are set while querying nested data (#2037)
   */
  atoms: async (
    _: Transaction,
    params: GetAtomsQueryVariables,
  ): Promise<Array<Atom>> => {
    const limit = params.options?.limit
    const offset = params.options?.offset
    const AtomInstance = await Repository.instance.Atom

    const filteredItemIds = await AtomInstance.find({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      where: params.where as any,
      selectionSet: `{ id }`,
      options: {
        limit,
        offset,
      },
    })

    const items = Promise.all(
      filteredItemIds
        .map(async (item) => {
          return (
            await AtomInstance.find({
              where: { id: item.id },
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
