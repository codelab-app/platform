import type {
  ITypeModel,
  ITypeRepository,
} from '@codelab/frontend/abstract/domain'
import type {
  GetBaseTypesOptions,
  IBaseTypeWhere,
} from '@codelab/shared/infra/gql'
import { prop, sortBy } from 'remeda'
import {
  GetBaseTypes,
  GetDescendants,
  GetTypeOptions,
} from './get-type.api.graphql.gen'
import {
  createTypeApi,
  deleteTypeApi,
  getAllTypes,
  updateTypeApi,
} from './type.api'

export const typeRepository: ITypeRepository = {
  add: async (type: ITypeModel) => {
    const createdTypes = await createTypeApi[type.kind]([type.toCreateInput()])

    return createdTypes[0]
  },

  delete: async (types: Array<ITypeModel>) => {
    const results = await Promise.all(
      types.map((type) => deleteTypeApi[type.kind]({ where: { id: type.id } })),
    )

    const nodesDeleted = results.reduce(
      (acc, result) => acc + result.nodesDeleted,
      0,
    )

    return nodesDeleted
  },

  find: async (where: IBaseTypeWhere) => {
    const ids = where.id_IN ?? undefined
    const types = await getAllTypes(ids)

    return { aggregate: { count: types.length }, items: types }
  },

  findBaseTypes: async ({ limit, offset, where }: GetBaseTypesOptions) => {
    const {
      baseTypes: { items, totalCount },
    } = await GetBaseTypes({
      options: {
        limit,
        offset,
        where,
      },
    })

    return {
      items,
      totalCount,
    }
  },

  findDescendants: async (parentIds: Array<string>) => {
    const { arrayTypes, interfaceTypes, unionTypes } = await GetDescendants({
      ids: parentIds,
    })

    const allDescendantIdsWithoutParents = [
      ...arrayTypes,
      ...unionTypes,
      ...interfaceTypes,
    ]
      .reduce<Array<string>>(
        (descendantIds, { descendantTypesIds }) => [
          ...descendantIds,
          ...descendantTypesIds.flat(),
        ],
        [],
      )
      .filter((id) => !parentIds.includes(id))

    if (allDescendantIdsWithoutParents.length === 0) {
      return []
    }

    return getAllTypes(allDescendantIdsWithoutParents)
  },

  findOne: async (where: IBaseTypeWhere) => {
    return (await typeRepository.find(where)).items[0]
  },

  findOptions: async () => {
    const {
      baseTypes: { items },
    } = await GetTypeOptions({})

    return sortBy(items, prop('name'))
  },

  getAll: async (ids?: Array<string>) => {
    // Fetch type fragments
    const { items: typeFragments } = await typeRepository.find({
      id_IN: ids,
    })

    // Fetch descendant types if ids are provided
    const descendantTypeFragments = ids
      ? await typeRepository.findDescendants(
          typeFragments.map((fragment) => fragment.id),
        )
      : []

    // Combine all fragments
    const allFragments = [...typeFragments, ...descendantTypeFragments]

    // Filter types if ids are provided, otherwise return all
    const filteredTypes = ids
      ? allFragments.filter((type) => ids.includes(type.id))
      : allFragments

    // Sort and return the result
    return sortBy(filteredTypes, ({ name }) => name.toLowerCase())
  },

  update: async (type: ITypeModel) => {
    const updatedType = await updateTypeApi[type.kind](type.toUpdateInput())

    return updatedType[0]!
  },
}
