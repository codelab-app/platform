import type { ITypeRepository } from '@codelab/frontend/abstract/domain'
import type { IRef, ITypeDto, ITypeRef } from '@codelab/shared/abstract/core'
import type { IBaseTypeWhere } from '@codelab/shared/infra/gql'

import { Validator } from '@codelab/shared/infra/schema'
import { createTypeApi, typeMapper } from '@codelab/shared-domain-module/type'
import { sortBy } from 'remeda'

import { GetBaseTypes, GetDescendants } from './get-type.api.graphql.web.gen'
// const { createTypeApi, deleteTypeApi, getAllTypes, updateTypeApi } =
//   './type.api'

/**
 * The record approach here has limitationg where we cannot create nested data.
 *
 * The input has optional nested data and we cast the input in the record, which makes it work if only have top level data
 */
export const typeRepository: ITypeRepository = {
  add: async (input: ITypeDto) => {
    Validator.assertsDefined(input.kind)

    const data = typeMapper.toCreateInput(input)
    const createdTypes = await (await createTypeApi())[input.kind]([data])

    Validator.assertsDefined(createdTypes[0])

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

  findBaseTypes: async (params) => {
    const where = params?.where ?? {}
    const options = params?.options ?? {}

    const { iBaseTypes } = await GetBaseTypes({
      options,
      where,
    })

    return {
      items: iBaseTypes,
      totalCount: iBaseTypes.reduce((acc: number, type) => {
        return acc + type.ownerConnection.totalCount
      }, 0),
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

  getAll: async (ids?: Array<string>) => {
    // Fetch type fragments
    const { items: typeFragments } = await typeRepository.find({
      id_IN: ids,
    })

    // Sort and return the result
    return sortBy(typeFragments, ({ name }) => name.toLowerCase())
  },

  update: async ({ id }: IRef, input: ITypeDto) => {
    const kind = input.kind

    Validator.assertsDefined(kind)

    const variables = typeMapper.toUpdateInput(input)

    const updatedType = await updateTypeApi[kind]({
      where: { id },
      ...variables,
    })

    Validator.assertsDefined(updatedType[0])

    return updatedType[0]
  },
}
