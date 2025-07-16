import type {
  ITypeCreateRoute,
  ITypeService,
  ITypeUpdateRoute,
} from '@codelab/frontend-abstract-application'
import type {
  IInterfaceTypeModel,
  ITypeCreateFormData,
  ITypeModel,
  ITypeUpdateDto,
} from '@codelab/frontend-abstract-domain'
import type { Maybe } from '@codelab/shared-abstract-types'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { RoutePaths } from '@codelab/frontend-abstract-application'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import { TypeFactory } from '@codelab/frontend-domain-type/store'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { ITypeKind } from '@codelab/shared-abstract-core'
import {
  findTypeApi,
  findTypeServerActions,
} from '@codelab/shared-domain-module-type'
import { TypeKind } from '@codelab/shared-infra-gqlgen'
import { Validator } from '@codelab/shared-infra-typebox'
import { prop, sortBy } from 'remeda'

const { GetTypeReferences } = findTypeServerActions

export const useTypeService = (): ITypeService => {
  const { typeDomainService, userDomainService } = useDomainStore()
  const user = userDomainService.currentUser
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
    console.log('getAll called with IDs:', ids)
    
    // Fetch type fragments
    const typeFragments = await typeRepository.getAll(ids)
    console.log('Type fragments from repository:', typeFragments.map(f => ({ 
      id: f.id, 
      kind: f.kind, 
      name: f.name,
      __typename: f.__typename 
    })))

    // Fetch descendant types if ids are provided
    const descendantTypeFragments = ids
      ? await typeRepository.findDescendants(
          typeFragments.map((fragment) => fragment.id),
        )
      : []
    
    console.log('Descendant type fragments:', descendantTypeFragments.map(f => ({ 
      id: f.id, 
      kind: f.kind, 
      name: f.name,
      __typename: f.__typename 
    })))

    // Combine all fragments
    const allFragments = [...typeFragments, ...descendantTypeFragments]
    console.log('All fragments before hydration:', allFragments.length)
    
    const types = typeDomainService.hydrateTypes(allFragments)
    console.log('Hydrated types:', types.map(t => ({ 
      id: t.id, 
      kind: t.kind, 
      name: t.name 
    })))

    // Filter types if ids are provided, otherwise return all
    const result = ids ? types.filter((type) => ids.includes(type.id)) : types
    console.log('Returning types:', result.map(t => ({ id: t.id, kind: t.kind, name: t.name })))
    
    return result
  }

  const getInterface = async (interfaceTypeId: string) => {
    console.log('getInterface called for:', interfaceTypeId)
    
    // Always load the interface first to ensure we have all fields
    const loadedTypes = await getAll([interfaceTypeId])
    const interfaceType = loadedTypes.find(({ id }) => id === interfaceTypeId)

    if (!interfaceType) {
      throw new Error('Type not found')
    }

    if (interfaceType.kind !== ITypeKind.InterfaceType) {
      throw new Error('Type is not an interface')
    }

    // Now get all field type IDs from the loaded interface
    const fieldTypeIds = (interfaceType as IInterfaceTypeModel).fields.map(
      (field) => field.type.id,
    )

    console.log('Field type IDs from loaded interface:', fieldTypeIds)
    
    // Check if we need to load any field types
    const missingTypeIds = fieldTypeIds.filter(
      (id) => !typeDomainService.types.get(id)
    )

    if (missingTypeIds.length > 0) {
      console.log('Loading missing field types:', missingTypeIds)
      // Load only the missing types
      await getAll(missingTypeIds)
    }

    // Re-fetch the interface to ensure all references are resolved
    const finalInterface = typeDomainService.types.get(interfaceTypeId) as IInterfaceTypeModel

    console.log('Returning interface with fields:', finalInterface.fields.map(f => ({ 
      name: f.name, 
      typeId: f.type.id,
      typeName: f.type.maybeCurrent?.name,
      typeKind: f.type.maybeCurrent?.kind
    })))

    return finalInterface
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
    console.log('shouldLoadType checking:', typeId, 'found in store:', !!type)

    if (!type || visitedTypeIds.has(typeId)) {
      console.log('shouldLoadType returning true - type not found or already visited')
      return true
    } else {
      // to avoid infinite recursion for circular types
      visitedTypeIds.add(typeId)
    }

    if (type.kind === TypeKind.InterfaceType) {
      for (const field of type.fields) {
        console.log('Checking field:', field.name, 'type ref:', field.type.id, 'resolved:', !!field.type.maybeCurrent)
        if (
          !field.type.maybeCurrent ||
          shouldLoadType(field.type.maybeCurrent.id, visitedTypeIds)
        ) {
          console.log('shouldLoadType returning true - field type needs loading')
          return true
        }
      }
    }

    if (type.kind === TypeKind.ArrayType) {
      if (
        !type.itemType?.maybeCurrent ||
        shouldLoadType(type.itemType.maybeCurrent.id, visitedTypeIds)
      ) {
        console.log('shouldLoadType returning true - array item type needs loading')
        return true
      }
    }

    if (type.kind === TypeKind.UnionType) {
      for (const typeOfUnion of type.typesOfUnionType) {
        if (
          !typeOfUnion.maybeCurrent ||
          shouldLoadType(typeOfUnion.maybeCurrent.id, visitedTypeIds)
        ) {
          console.log('shouldLoadType returning true - union type needs loading')
          return true
        }
      }
    }

    console.log('shouldLoadType returning false - all types loaded')
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
