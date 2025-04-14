import type {
  ITypeCreateRoute,
  ITypeService,
  ITypeUpdateRoute,
} from '@codelab/frontend/abstract/application'
import type {
  IInterfaceTypeModel,
  ITypeCreateFormData,
  ITypeModel,
  ITypeUpdateDto,
} from '@codelab/frontend/abstract/domain'
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
import {
  findTypeApi,
  findTypeServerActions,
} from '@codelab/shared-domain-module/type'
import { prop, sortBy } from 'remeda'

const { GetTypeReferences } = findTypeServerActions

export const useTypeService = (): ITypeService => {
  const { typeDomainService, userDomainService } = useDomainStore()
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

  const deleteType = async (type: ITypeModel) => {
    const { getTypeReferences } = await GetTypeReferences({
      typeId: type.id,
    })

    if (getTypeReferences?.length) {
      const allRefs = getTypeReferences.map(
        (typeRef) => `${typeRef.name} (${typeRef.label})`,
      )

      const label = Array.from(new Set(allRefs)).join(', ')

      throw new Error(`Can't delete typed since it's referenced in ${label}`)
    }

    await removeMany([type])
  }

  const removeMany = async (types: Array<ITypeModel>) => {
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

  const shouldLoadType = (
    typeId: string,
    visitedTypeIds: Set<string> = new Set(),
  ) => {
    const type = typeDomainService.types.get(typeId)

    if (!type || visitedTypeIds.has(typeId)) {
      return true
    } else {
      // to avoid infinite recursion for circular types
      visitedTypeIds.add(typeId)
    }

    if (type.kind === TypeKind.InterfaceType) {
      for (const field of type.fields) {
        if (
          !field.type.maybeCurrent ||
          shouldLoadType(field.type.maybeCurrent.id, visitedTypeIds)
        ) {
          return true
        }
      }
    }

    if (type.kind === TypeKind.ArrayType) {
      if (
        !type.itemType?.maybeCurrent ||
        shouldLoadType(type.itemType.maybeCurrent.id, visitedTypeIds)
      ) {
        return true
      }
    }

    if (type.kind === TypeKind.UnionType) {
      for (const typeOfUnion of type.typesOfUnionType) {
        if (
          !typeOfUnion.maybeCurrent ||
          shouldLoadType(typeOfUnion.maybeCurrent.id, visitedTypeIds)
        ) {
          return true
        }
      }
    }

    return false
  }

  const updatePopover = {
    close: (router: AppRouterInstance, { searchParams }: ITypeUpdateRoute) => {
      const selectedKey = typeDomainService.selectedKey
      const expandedKeys = typeDomainService.expandedNodes

      router.push(
        RoutePaths.Type.base({ ...searchParams, expandedKeys, selectedKey }),
      )
    },
    open: (
      router: AppRouterInstance,
      { params, searchParams }: ITypeUpdateRoute,
    ) => {
      const selectedKey = typeDomainService.selectedKey
      const expandedKeys = typeDomainService.expandedNodes

      router.push(
        RoutePaths.Type.update({
          params,
          searchParams: { ...searchParams, expandedKeys, selectedKey },
        }),
      )
    },
  }

  const createPopover = {
    close: (router: AppRouterInstance, { searchParams }: ITypeCreateRoute) => {
      const selectedKey = typeDomainService.selectedKey
      const expandedKeys = typeDomainService.expandedNodes

      router.push(
        RoutePaths.Type.base({ ...searchParams, expandedKeys, selectedKey }),
      )
    },
    open: (router: AppRouterInstance, { searchParams }: ITypeCreateRoute) => {
      const selectedKey = typeDomainService.selectedKey
      const expandedKeys = typeDomainService.expandedNodes

      router.push(
        RoutePaths.Type.create({ ...searchParams, expandedKeys, selectedKey }),
      )
    },
  }

  return {
    create,
    createPopover,
    deleteType,
    getAll,
    getInterface,
    getOne,
    getSelectOptions,
    removeMany,
    update,
    updatePopover,
  }
}
