import type { ITypeService } from '@codelab/frontend/abstract/application'
import type {
  ITypeModel,
  IUpdateTypeDto,
} from '@codelab/frontend/abstract/domain'
import { typeRef } from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend/infra/mobx'
import { usePaginationService } from '@codelab/frontend-application-shared-store/pagination'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import { TypeFactory } from '@codelab/frontend-domain-type/store'
import { TypeKind } from '@codelab/shared/abstract/codegen'
import type {
  ICreateTypeDto,
  IPrimitiveTypeKind,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { assertIsDefined } from '@codelab/shared/utils'
import compact from 'lodash/compact'
import sortBy from 'lodash/sortBy'

export const useTypeService = (): ITypeService => {
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

  const paginationService = usePaginationService<ITypeModel, { name?: string }>(
    'type',
    getDataFn,
  )

  const create = async (data: ICreateTypeDto) => {
    const type = typeDomainService.hydrate(TypeFactory.mapDataToDTO(data))

    await typeRepository.add(type)

    paginationService.dataRefs.set(type.id, typeRef(type))

    return type
  }

  const deleteType = async (types: Array<ITypeModel>) => {
    const deleteTypeOperation = async (type: ITypeModel) => {
      const { id } = type

      typeDomainService.types.delete(id)

      await typeRepository.delete([type])
    }

    await Promise.all(types.map((type) => deleteTypeOperation(type)))
  }

  const getAll = async (ids?: Array<string>) => {
    const existingTypes = compact(
      ids?.map((id) => typeDomainService.types.get(id)) ?? [],
    )

    const idsToLoad = ids?.filter((id) => shouldLoadType(id))
    let newTypes: Array<ITypeModel> = []

    if (idsToLoad?.length || !ids) {
      const { items: typeFragments } = await typeRepository.find({
        id_IN: idsToLoad,
      })

      const parentIds = typeFragments.map((typeFragment) => typeFragment.id)

      const descendantTypeFragments = ids
        ? await typeRepository.findDescendants(parentIds)
        : []

      const newFragments = [...typeFragments, ...descendantTypeFragments]

      newTypes = compact(
        newFragments.map((typeFragment) => {
          if (typeFragment.__typename === TypeKind.InterfaceType) {
            typeFragment.fields.forEach((fieldFragment) => {
              fieldDomainService.hydrate(fieldFragment)
            })
          }

          const newType = typeDomainService.hydrate(typeFragment)

          return idsToLoad?.includes(typeFragment.id) || !ids
            ? newType
            : undefined
        }),
      )
    }

    const allTypes = [...existingTypes, ...newTypes]
    const result = sortBy(allTypes, ({ name }) => name.toLowerCase())

    return result
  }

  const getInterface = async (interfaceTypeId: string) => {
    const interfaceFromStore = getType(interfaceTypeId)

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

    assertIsDefined(type)

    const typeDto = TypeFactory.mapDataToDTO(data)

    TypeFactory.writeCache(typeDto, type)

    await typeRepository.update(type)

    return type
  }

  const primitiveKind = (id: string): Nullable<IPrimitiveTypeKind> => {
    const type = typeDomainService.types.get(id)

    if (type?.kind === ITypeKind.PrimitiveType) {
      return type.primitiveKind
    }

    return null
  }

  const getType = (id: string) => {
    return typeDomainService.types.get(id)
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
    getType,
    primitiveKind,
    remove: deleteType,
    shouldLoadType,
    typeDomainService,
    typeRepository,
    update,
  }
}
