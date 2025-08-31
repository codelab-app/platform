import type { ITypeRepository } from '@codelab/frontend-abstract-domain'
import type { IRef, ITypeDto, ITypeRef } from '@codelab/shared-abstract-core'
import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import type {
  IBaseTypeOptions,
  IBaseTypeWhere,
} from '@codelab/shared-infra-gqlgen'

import { ITypeKind } from '@codelab/shared-abstract-core'
import {
  createTypeServerActions,
  deleteTypeServerActions,
  findTypeServerActions,
  getAllTypes,
  typeMapperRecord,
  updateTypeServerActions,
} from '@codelab/shared-domain-module-type'
import { Validator } from '@codelab/shared-infra-typebox'

const { GetBaseTypes, GetDescendants } = findTypeServerActions

/**
 * The record approach here has limitationg where we cannot create nested data.
 *
 * The input has optional nested data and we cast the input in the record, which makes it work if only have top level data
 */
export const typeRepository: ITypeRepository = {
  add: async (input: ITypeDto, next?: NextFetchOptions) => {
    const createAction = async (type: ITypeKind) =>
      (await createTypeServerActions)[type]

    switch (input.__typename) {
      case ITypeKind.ActionType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const actionCreator = await createAction(input.kind)
        const createdType = (await actionCreator([data], next))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.AppType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const actionCreator = await createAction(input.kind)
        const createdType = (await actionCreator([data], next))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.ArrayType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const actionCreator = await createAction(input.kind)
        const createdType = (await actionCreator([data], next))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.CodeMirrorType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const actionCreator = await createAction(input.kind)
        const createdType = (await actionCreator([data], next))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.ElementType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const actionCreator = await createAction(input.kind)
        const createdType = (await actionCreator([data], next))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.EnumType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const actionCreator = await createAction(input.kind)
        const createdType = (await actionCreator([data], next))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.InterfaceType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const actionCreator = await createAction(input.kind)
        const createdType = (await actionCreator([data], next))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.LambdaType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const actionCreator = await createAction(input.kind)
        const createdType = (await actionCreator([data], next))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.PageType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const actionCreator = await createAction(input.kind)
        const createdType = (await actionCreator([data], next))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.PrimitiveType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const actionCreator = await createAction(input.kind)
        const createdType = (await actionCreator([data], next))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.ReactNodeType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const actionCreator = await createAction(input.kind)
        const createdType = (await actionCreator([data], next))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.RenderPropType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const actionCreator = await createAction(input.kind)
        const createdType = (await actionCreator([data], next))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.RichTextType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const actionCreator = await createAction(input.kind)
        const createdType = (await actionCreator([data], next))[0]

        return Validator.parseDefined(createdType)
      }

      case ITypeKind.UnionType: {
        const data = typeMapperRecord[input.__typename].toCreateInput(input)
        const actionCreator = await createAction(input.kind)
        const createdType = (await actionCreator([data], next))[0]

        return Validator.parseDefined(createdType)
      }

      default:
        throw new Error('Type not handled')
    }
  },

  delete: async (types: Array<ITypeRef>, next?: NextFetchOptions) => {
    const deleteAction = async (type: ITypeKind) =>
      (await deleteTypeServerActions)[type]

    const results = await Promise.all(
      types.map(async (type) => {
        const action = await deleteAction(ITypeKind[type.__typename])

        return await action({ where: { id: type.id } }, next)
      }),
    )

    const nodesDeleted = results.reduce(
      (acc, result) => acc + result.nodesDeleted,
      0,
    )

    return nodesDeleted
  },

  find: async (
    where?: IBaseTypeWhere,
    options?: IBaseTypeOptions,
    next?: NextFetchOptions,
  ) => {
    const ids = where?.id_IN ?? undefined
    const types = await getAllTypes(ids, next)

    return { aggregate: { count: types.length }, items: types }
  },

  findBaseTypes: async (params, next?: NextFetchOptions) => {
    const where = params?.where ?? {}
    const options = params?.options ?? {}

    const { aggregate, iBaseTypes } = await GetBaseTypes(
      {
        options,
        where,
      },
      next,
    )

    return {
      items: iBaseTypes,
      totalCount: aggregate.count,
    }
  },

  findDescendants: async (
    parentIds: Array<string>,
    next?: NextFetchOptions,
  ) => {
    const { arrayTypes, interfaceTypes, unionTypes } = await GetDescendants(
      {
        ids: parentIds,
      },
      next,
    )

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

    return getAllTypes(allDescendantIdsWithoutParents, next)
  },

  findOne: async (where: IBaseTypeWhere, next?: NextFetchOptions) => {
    return (await typeRepository.find(where, undefined, next)).items[0]
  },

  getAll: async (ids?: Array<string>, next?: NextFetchOptions) => {
    // Fetch type fragments
    const { items: typeFragments } = await typeRepository.find(
      {
        id_IN: ids,
      },
      undefined,
      next,
    )

    return typeFragments
  },

  update: async ({ id }: IRef, input: ITypeDto, next?: NextFetchOptions) => {
    Validator.assertsDefined(input.__typename)

    const updateAction = async (type: ITypeKind) =>
      (await updateTypeServerActions)[type]

    switch (input.__typename) {
      case ITypeKind.ActionType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const action = await updateAction(ITypeKind[input.__typename])

        const types = await action(
          {
            update: variables,
            where: { id },
          },
          next,
        )

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.AnyType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const action = await updateAction(ITypeKind[input.__typename])

        const types = await action(
          {
            update: variables,
            where: { id },
          },
          next,
        )

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.AppType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const action = await updateAction(ITypeKind[input.__typename])

        const types = await action(
          {
            update: variables,
            where: { id },
          },
          next,
        )

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.ArrayType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const action = await updateAction(ITypeKind[input.__typename])

        const types = await action(
          {
            update: variables,
            where: { id },
          },
          next,
        )

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.CodeMirrorType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const action = await updateAction(ITypeKind[input.__typename])

        const types = await action(
          {
            update: variables,
            where: { id },
          },
          next,
        )

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.ElementType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const action = await updateAction(ITypeKind[input.__typename])

        const types = await action(
          {
            update: variables,
            where: { id },
          },
          next,
        )

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.EnumType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const action = await updateAction(ITypeKind[input.__typename])

        const types = await action(
          {
            update: variables,
            where: { id },
          },
          next,
        )

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.InterfaceType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const action = await updateAction(ITypeKind[input.__typename])

        const types = await action(
          {
            update: variables,
            where: { id },
          },
          next,
        )

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.LambdaType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const action = await updateAction(ITypeKind[input.__typename])

        const types = await action(
          {
            update: variables,
            where: { id },
          },
          next,
        )

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.PageType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const action = await updateAction(ITypeKind[input.__typename])

        const types = await action(
          {
            update: variables,
            where: { id },
          },
          next,
        )

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.PrimitiveType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const action = await updateAction(ITypeKind[input.__typename])

        const types = await action(
          {
            update: variables,
            where: { id },
          },
          next,
        )

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.ReactNodeType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const action = await updateAction(ITypeKind[input.__typename])

        const types = await action(
          {
            update: variables,
            where: { id },
          },
          next,
        )

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.RenderPropType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const action = await updateAction(ITypeKind[input.__typename])

        const types = await action(
          {
            update: variables,
            where: { id },
          },
          next,
        )

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.RichTextType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const action = await updateAction(ITypeKind[input.__typename])

        const types = await action(
          {
            update: variables,
            where: { id },
          },
          next,
        )

        return Validator.parseDefined(types[0])
      }

      case ITypeKind.UnionType: {
        const variables =
          typeMapperRecord[input.__typename].toUpdateInput(input)

        const action = await updateAction(ITypeKind[input.__typename])

        const types = await action(
          {
            update: variables,
            where: { id },
          },
          next,
        )

        return Validator.parseDefined(types[0])
      }

      default:
        throw new Error('Type not handled')
    }
  },
}
