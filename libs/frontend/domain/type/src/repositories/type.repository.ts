import type {
  ITypeCreateInput,
  ITypeModel,
  ITypeRepository,
  ITypeUpdateInput,
} from '@codelab/frontend/abstract/domain'
import type {
  IRef,
  ITypeCreateDto,
  ITypeKind,
  ITypeRef,
} from '@codelab/shared/abstract/core'
import type {
  GetBaseTypesOptions,
  IBaseTypeWhere,
} from '@codelab/shared/infra/gql'

import { Validator } from '@codelab/shared/infra/schema'
import { prop, sortBy } from 'remeda'
import { ValidatedForm } from 'uniforms'

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
  add: async (input: ITypeCreateInput) => {
    Validator.assertsDefined(input.kind)

    const createdTypes = await createTypeApi[input.kind]([input])

    return createdTypes[0]
  },

  delete: async (types: Array<ITypeRef>) => {
    const results = await Promise.all(
      types.map((type) =>
        deleteTypeApi[type.__typename]({ where: { id: type.id } }),
      ),
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

    // Sort and return the result
    return sortBy(typeFragments, ({ name }) => name.toLowerCase())
  },

  update: async (input: ITypeUpdateInput, typekind: ITypeKind) => {
    const updatedType = await updateTypeApi[typekind](input)

    return updatedType[0]!
  },
}
