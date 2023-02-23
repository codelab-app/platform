import {
  atomSelectionSet,
  Repository,
  tagSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import type {
  Atom,
  GetAtomsQueryVariables,
} from '@codelab/shared/abstract/codegen'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { Transaction } from 'neo4j-driver'

export const atomRepository = {
  /**
   * Used for field resolver on atom. We custom resolve atoms because
   * the default resolver returns inconsistent results when offset and
   * limit options are set while querying nested data (#2037)
   */
  atoms: async (
    _: Transaction,
    params: GetAtomsQueryVariables,
  ): Promise<Array<OGM_TYPES.Atom>> => {
    const limit = params.options?.limit
    const offset = params.options?.offset
    const AtomInstance = await Repository.instance.Atom

    const filteredItemIds = await AtomInstance.find({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      where: params.where as any,
      selectionSet: `{ id }`,
      options: {
        sort: [
          {
            name: OGM_TYPES.SortDirection.Asc,
          },
        ],
        limit,
        offset,
      },
    })

    const items = (
      await Promise.all(
        filteredItemIds.map(async (item) => {
          return (
            await AtomInstance.find({
              where: { id: item.id },
              options: {
                sort: [
                  {
                    name: OGM_TYPES.SortDirection.Asc,
                  },
                ],
              },
              selectionSet: atomSelectionSet.replace(
                /tags {([a-z]|\s)*}/g,
                `tags ${tagSelectionSet}`,
              ),
            })
          )[0]
        }),
      )
    ).filter((atom): atom is OGM_TYPES.Atom => !atom)

    return items
  },
}
