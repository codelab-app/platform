import type { ITypeService } from '@codelab/frontend/abstract/application'
import type {
  IInterfaceTypeModel,
  ITypeCreateFormData,
  ITypeModel,
  ITypeUpdateDto,
} from '@codelab/frontend/abstract/domain'
import type { TreeViewParams } from '@codelab/frontend/abstract/types'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { RoutePaths } from '@codelab/frontend/abstract/application'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import { TypeFactory } from '@codelab/frontend-domain-type/store'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { TypeKind } from '@codelab/shared/infra/gqlgen'
import { Validator } from '@codelab/shared/infra/typebox'
import { findTypeApi } from '@codelab/shared-domain-module/type'
import { prop, sortBy } from 'remeda'

export const useTypeService = (): ITypeService => {
  const { fieldDomainService, typeDomainService, userDomainService } =
    useDomainStore()

  const user = userDomainService.user
  const owner = { id: user.id }

  const create = async (data: ITypeCreateFormData) => {
    const typeDto = TypeFactory.mapDataToDto(data, owner)
    const type = typeDomainService.hydrate(typeDto)

    // use hydrated type here instead of dto to make sure the dependant types have full data
    // (for example "typesOfUnionType" should not only contain ids, but also __typename)
    await typeRepository.add(type.toJson, {
      revalidateTags: [CACHE_TAGS.Type.list()],
    })

    return type
  }

  const deleteType = async (types: Array<ITypeModel>) => {
    const deleteTypeOperation = async (type: ITypeModel) => {
      const { id } = type

      typeDomainService.types.delete(id)

      return await typeRepository.delete([type], {
        revalidateTags: [CACHE_TAGS.Type.list()],
      })
    }

    const items = await Promise.all(
      types.map((type) => deleteTypeOperation(type)),
    )

    return items.length
  }

  const getAll = async (ids?: Array<string>) => {
    // Fetch type fragments
    const typeFragments = await typeRepository.getAll(ids)

    // Fetch descendant types if ids are provided
    const descendantTypeFragments = ids
      ? await typeRepository.findDescendants(
          typeFragments.map((fragment) => fragment.id),
        )
      : []

    // Combine all fragments
    const allFragments = [...typeFragments, ...descendantTypeFragments]
    const types = typeDomainService.hydrateTypes(allFragments)

    // Filter types if ids are provided, otherwise return all
    return ids ? types.filter((type) => ids.includes(type.id)) : types
  }

  const getInterface = async (interfaceTypeId: string) => {
    const interfaceFromStore = typeDomainService.types.get(interfaceTypeId)

    if (
      interfaceFromStore &&
      interfaceFromStore.kind === ITypeKind.InterfaceType &&
      !shouldLoadType(interfaceTypeId)
    ) {
      return interfaceFromStore
    }

    const fieldTypeIds =
      (interfaceFromStore as Maybe<IInterfaceTypeModel>)?.fields.map(
        (field) => field.type.id,
      ) ?? []

    const loadedTypes = await getAll([interfaceTypeId, ...fieldTypeIds])
    const interfaceType = loadedTypes.find(({ id }) => id === interfaceTypeId)

    if (!interfaceType) {
      throw new Error('Type not found')
    }

    if (interfaceType.kind !== ITypeKind.InterfaceType) {
      throw new Error('Type is not an interface')
    }

    return interfaceType
  }

  const getOne = async (id: string) => {
    const all = await getAll([id])

    return all[0]
  }

  const getSelectOptions = async () => {
    const { iBaseTypes } = await findTypeApi().GetBaseTypes({})

    return sortBy(iBaseTypes, prop('name'))
  }

  const update = async (data: ITypeUpdateDto) => {
    const type = typeDomainService.types.get(data.id)

    Validator.assertsDefined(type)

    const typeDto = TypeFactory.mapDataToDto(data, owner)

    TypeFactory.writeCache(typeDto, type)

    // use hydrated type here instead of dto to make sure the dependant types have full data
    // (for example "typesOfUnionType" should not only contain ids, but also __typename)
    await typeRepository.update({ id: type.id }, type.toJson, {
      revalidateTags: [CACHE_TAGS.Type.list()],
    })

    return type
  }

  const shouldLoadType = (typeId: string) => {
    const type = typeDomainService.types.get(typeId)

    if (!type) {
      return true
    }

    if (type.kind === TypeKind.InterfaceType) {
      for (const field of type.fields) {
        if (
          !field.type.maybeCurrent ||
          shouldLoadType(field.type.maybeCurrent.id)
        ) {
          return true
        }
      }
    }

    if (type.kind === TypeKind.ArrayType) {
      if (
        !type.itemType?.maybeCurrent ||
        shouldLoadType(type.itemType.maybeCurrent.id)
      ) {
        return true
      }
    }

    if (type.kind === TypeKind.UnionType) {
      for (const typeOfUnion of type.typesOfUnionType) {
        if (
          !typeOfUnion.maybeCurrent ||
          shouldLoadType(typeOfUnion.maybeCurrent.id)
        ) {
          return true
        }
      }
    }

    return false
  }

  const updatePopover = {
    close: (router: AppRouterInstance, params: TreeViewParams) => {
      router.push(RoutePaths.Type.base(params))
    },
    open: (
      router: AppRouterInstance,
      params: { typeId: string } & TreeViewParams,
    ) => {
      router.push(RoutePaths.Type.update(params))
    },
  }

  const createPopover = {
    close: (router: AppRouterInstance, params: TreeViewParams) => {
      router.push(RoutePaths.Type.base(params))
    },
    open: (router: AppRouterInstance, params: TreeViewParams) => {
      router.push(RoutePaths.Type.create(params))
    },
  }

  return {
    create,
    createPopover,
    getAll,
    getInterface,
    getOne,
    getSelectOptions,
    removeMany: deleteType,
    update,
    updatePopover,
  }
}
