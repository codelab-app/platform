import type {
  Atom,
  GetAtomsQueryVariables,
} from '@codelab/shared/abstract/codegen'
import { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { IFieldResolver } from '@graphql-tools/utils'
import type { GraphQLRequestContext } from 'apollo-server-types'
import { Repository } from '../../../infra'
import { atomSelectionSet, tagSelectionSet } from '../../../selectionSet'

export const atoms: IFieldResolver<
  GraphQLRequestContext,
  unknown,
  GetAtomsQueryVariables
> = async (_, params) => {
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

  const items = Promise.all(
    filteredItemIds
      .map(async (item) => {
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
      })
      .filter(Boolean) as Array<Promise<Atom>>,
  )

  return items
}
