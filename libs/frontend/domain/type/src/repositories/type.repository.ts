import type { ITypeRepository } from '@codelab/frontend/abstract/domain'
import type { IRef, ITypeDto, ITypeRef } from '@codelab/shared/abstract/core'
import type { IBaseTypeWhere } from '@codelab/shared/infra/gql'

import { ITypeKind } from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/schema'
import {
  createTypeServerActions,
  deleteTypeServerActions,
  findTypeServerActions,
  getAllTypes,
  typeMapperRecord,
  updateTypeServerActions,
} from '@codelab/shared-domain-module/type'
import { sortBy } from 'remeda'

const { GetBaseTypes, GetDescendants } = findTypeServerActions

/**
 * The record approach here has limitationg where we cannot create nested data.
 *
 * The input has optional nested data and we cast the input in the record, which makes it work if only have top level data
 */
export const typeRepository: ITypeRepository = {
  add: async (input: ITypeDto) => {
    const createAction = async (type: ITypeKind) =>
      (await createTypeServerActions)[type]

    switch (input.__typename) {
      case ITypeKind.ActionType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const createdType = (await (await createAction(input.kind))([data]))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.AppType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const createdType = (await (await createAction(input.kind))([data]))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.ArrayType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const createdType = (await (await createAction(input.kind))([data]))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.CodeMirrorType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const createdType = (await (await createAction(input.kind))([data]))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.ElementType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const createdType = (await (await createAction(input.kind))([data]))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.EnumType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const createdType = (await (await createAction(input.kind))([data]))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.InterfaceType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const createdType = (await (await createAction(input.kind))([data]))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.LambdaType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const createdType = (await (await createAction(input.kind))([data]))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.PageType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const createdType = (await (await createAction(input.kind))([data]))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.PrimitiveType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const createdType = (await (await createAction(input.kind))([data]))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.ReactNodeType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const createdType = (await (await createAction(input.kind))([data]))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.RenderPropType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const createdType = (await (await createAction(input.kind))([data]))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.RichTextType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const createdType = (await (await createAction(input.kind))([data]))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.UnionType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const createdType = (await (await createAction(input.kind))([data]))[0]

        return Validator.parseDefined(createdType)
      }

      default:
        throw new Error('Type not handled')
    }
  },

  delete: async (types: Array<ITypeRef>) => {
    const deleteAction = async (type: ITypeKind) =>
      (await deleteTypeServerActions)[type]

    const results = await Promise.all(
      types.map(
        async (type) =>
          await (
            await deleteAction(ITypeKind[type.__typename])
          )({ where: { id: type.id } }),
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
    Validator.assertsDefined(input.__typename)

    const updateAction = async (type: ITypeKind) =>
      (await updateTypeServerActions)[type]

    switch (input.__typename) {
      case ITypeKind.ActionType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const types = await (
          await updateAction(ITypeKind[input.__typename])
        )({
          update: variables,
          where: { id },
        })

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.AppType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const types = await (
          await updateAction(ITypeKind[input.__typename])
        )({
          update: variables,
          where: { id },
        })

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.ArrayType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const types = await (
          await updateAction(ITypeKind[input.__typename])
        )({
          update: variables,
          where: { id },
        })

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.CodeMirrorType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const types = await (
          await updateAction(ITypeKind[input.__typename])
        )({
          update: variables,
          where: { id },
        })

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.ElementType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const types = await (
          await updateAction(ITypeKind[input.__typename])
        )({
          update: variables,
          where: { id },
        })

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.EnumType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const types = await (
          await updateAction(ITypeKind[input.__typename])
        )({
          update: variables,
          where: { id },
        })

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.InterfaceType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const types = await (
          await updateAction(ITypeKind[input.__typename])
        )({
          update: variables,
          where: { id },
        })

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.LambdaType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const types = await (
          await updateAction(ITypeKind[input.__typename])
        )({
          update: variables,
          where: { id },
        })

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.PageType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const types = await (
          await updateAction(ITypeKind[input.__typename])
        )({
          update: variables,
          where: { id },
        })

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.PrimitiveType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const types = await (
          await updateAction(ITypeKind[input.__typename])
        )({
          update: variables,
          where: { id },
        })

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.ReactNodeType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const types = await (
          await updateAction(ITypeKind[input.__typename])
        )({
          update: variables,
          where: { id },
        })

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.RenderPropType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const types = await (
          await updateAction(ITypeKind[input.__typename])
        )({
          update: variables,
          where: { id },
        })

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.RichTextType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const types = await (
          await updateAction(ITypeKind[input.__typename])
        )({
          update: variables,
          where: { id },
        })

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.UnionType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const types = await (
          await updateAction(ITypeKind[input.__typename])
        )({
          update: variables,
          where: { id },
        })

        return Validator.parseDefined(types[0])
      }

      default:
        throw new Error('Type not handled')
    }
  },
}
