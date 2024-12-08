import type {
  GetDataFn,
  ITypeService,
} from '@codelab/frontend/abstract/application'
import type {
  IInterfaceTypeModel,
  ITypeCreateFormData,
  ITypeModel,
  ITypeUpdateDto,
} from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { typeRef } from '@codelab/frontend/abstract/domain'
import { PageType } from '@codelab/frontend/abstract/types'
import { graphqlFilterMatches } from '@codelab/frontend-application-shared-store/pagination'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import { TypeFactory } from '@codelab/frontend-domain-type/store'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { TypeKind } from '@codelab/shared/infra/gql'
import { Validator } from '@codelab/shared/infra/schema'
import { prop, sortBy } from 'remeda'

export const useTypeService = (): ITypeService => {
  const {
    pagination: { typePagination },
  } = useApplicationStore()

  const { fieldDomainService, typeDomainService, userDomainService } =
    useDomainStore()

  const user = userDomainService.user
  const owner = { id: user.id }

  const getDataFn: GetDataFn<ITypeModel> = async (
    page,
    pageSize,
    filter,
    search,
  ) => {
    const { items: baseTypes, totalCount: totalItems } =
      await typeRepository.findBaseTypes({
        options: {
          limit: pageSize,
          offset: (page - 1) * pageSize,
        },
        where: graphqlFilterMatches(filter, search),
      })

    const typeIds = baseTypes.map(({ id }) => id)
    const items = await getAll(typeIds)

    return { items, totalItems }
  }

  const create = async (data: ITypeCreateFormData) => {
    const typeDto = TypeFactory.mapDataToDto(data, owner)
    const type = typeDomainService.hydrate(typeDto)

    await typeRepository.add(typeDto)

    typePagination.dataRefs.set(type.id, typeRef(type))

    return type
  }

  const deleteType = async (types: Array<ITypeModel>) => {
    const deleteTypeOperation = async (type: ITypeModel) => {
      const { id } = type

      typeDomainService.types.delete(id)

      return await typeRepository.delete([type])
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

    const types = allFragments.map((typeFragment) => {
      if (typeFragment.__typename === TypeKind.InterfaceType) {
        typeFragment.fields.forEach((field) =>
          fieldDomainService.hydrate(field),
        )
      }

      return typeDomainService.hydrate(typeFragment)
    })

    // Filter types if ids are provided, otherwise return all
    return ids ? types.filter((type) => ids.includes(type.id)) : types
  }

  const getInterface = async (interfaceTypeId: string) => {
    const interfaceFromStore = typeDomainService.getType(interfaceTypeId)

    if (
      interfaceFromStore &&
      interfaceFromStore.kind === ITypeKind.InterfaceType &&
      !shouldLoadType(interfaceTypeId)
    ) {
      return interfaceFromStore
    }

    const fieldTypeIds = (interfaceFromStore as IInterfaceTypeModel).fields.map(
      (field) => field.type.id,
    )

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
    const { items } = await typeRepository.findBaseTypes()

    return sortBy(items, prop('name'))
  }

  const update = async (data: ITypeUpdateDto) => {
    const type = typeDomainService.types.get(data.id)

    Validator.assertsDefined(type)

    const typeDto = TypeFactory.mapDataToDto(data, owner)

    TypeFactory.writeCache(typeDto, type)

    await typeRepository.update({ id: type.id }, typeDto)

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

  const getOneFromCache = (ref: IRef) => {
    return typeDomainService.types.get(ref.id)
  }

  const getAllFromCache = () => {
    return Array.from(typeDomainService.types.values())
  }

  const updatePopover = {
    close: (router: AppRouterInstance) => {
      router.push(PageType.Type())
    },
    open: (router: AppRouterInstance, id: string) => {
      router.push(PageType.TypeUpdate({ id }))
    },
  }

  const createPopover = {
    close: (router: AppRouterInstance) => {
      router.push(PageType.Type())
    },
    open: (router: AppRouterInstance) => {
      router.push(PageType.TypeCreate())
    },
  }

  return {
    create,
    createPopover,
    getAll,
    getAllFromCache,
    getDataFn,
    getInterface,
    getOne,
    getOneFromCache,
    getSelectOptions,
    paginationService: typePagination,
    removeMany: deleteType,
    update,
    updatePopover,
  }
}
