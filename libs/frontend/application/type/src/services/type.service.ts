import type { ITypeService } from '@codelab/frontend/abstract/application'
import {
  type ITypeModel,
  type IUpdateTypeDto,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import { TypeFactory } from '@codelab/frontend-domain-type/store'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import type { ICreateTypeDto } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { TypeKind } from '@codelab/shared/infra/gql'
import { Validator } from '@codelab/shared/infra/schema'

export const useTypeService = (): ITypeService => {
  const {
    pagination: { typePagination },
  } = useApplicationStore()

  const { fieldDomainService, typeDomainService } = useDomainStore()

  const getDataFn = async (
    page: number,
    pageSize: number,
    filter: { name?: string },
  ) => {
    const { items: baseTypes, totalCount: totalItems } =
      await typeRepository.findBaseTypes({
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: filter,
      })

    const typeIds = baseTypes.map(({ id }) => id)
    const items = await getAll(typeIds)

    return { items, totalItems }
  }

  const create = async (data: ICreateTypeDto) => {
    const type = typeDomainService.hydrate(TypeFactory.mapDataToDTO(data))

    await typeRepository.add(type)

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

    const types = typeFragments.map((typeFragment) => {
      if (typeFragment.__typename === TypeKind.InterfaceType) {
        typeFragment.fields.forEach((field) =>
          fieldDomainService.hydrate(field),
        )
      }

      return typeDomainService.hydrate(typeFragment)
    })

    return types
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

    const [interfaceType] = await getAll([interfaceTypeId])

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

  const getOptions = async () => {
    const options = await typeRepository.findOptions()

    return options
  }

  const update = async (data: IUpdateTypeDto) => {
    const type = typeDomainService.types.get(data.id)

    Validator.assertsDefined(type)

    const typeDto = TypeFactory.mapDataToDTO(data)

    TypeFactory.writeCache(typeDto, type)

    await typeRepository.update(type)

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

  return {
    create,
    getAll,
    getInterface,
    getOne,
    getOptions,
    paginationService: typePagination,
    remove: deleteType,
    update,
  }
}
