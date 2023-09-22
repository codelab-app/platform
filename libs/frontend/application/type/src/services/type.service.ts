import type { ITypeService } from '@codelab/frontend/abstract/application'
import type {
  ICreateTypeData,
  IInterfaceTypeRef,
  ITypeModel,
  IUpdateTypeData,
} from '@codelab/frontend/abstract/domain'
import { typeRef } from '@codelab/frontend/abstract/domain'
import {
  InlineFormService,
  ModalService,
  PaginationService,
} from '@codelab/frontend/domain/shared'
import { TypeDomainService, TypeFactory } from '@codelab/frontend/domain/type'
import { TypeKind } from '@codelab/shared/abstract/codegen'
import type { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import compact from 'lodash/compact'
import sortBy from 'lodash/sortBy'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import type { GetTypesQuery } from '../graphql/get-type.endpoints.graphql.gen'
import { TypeRepository } from '../graphql/type.repo'
import { getFieldService } from './field.service.context'
import { TypeFormService } from './type-form.service'
import { TypeModalService } from './type-modal.service'

@model('@codelab/TypeService')
export class TypeService
  extends Model({
    allTypesLoaded: prop(() => false),
    createForm: prop(() => new InlineFormService({})),
    createModal: prop(() => new ModalService({})),
    /**
     * Used to show current paginated types
     */
    deleteModal: prop(() => new TypeModalService({})),
    paginationService: prop(
      () => new PaginationService<ITypeModel, { name?: string }>({}),
    ),
    typeDomainService: prop(() => new TypeDomainService({})),
    typeRepository: prop(() => new TypeRepository({})),
    updateForm: prop(() => new TypeFormService({})),
    updateModal: prop(() => new TypeModalService({})),
  })
  implements ITypeService
{
  @modelFlow
  @transaction
  create = _async(function* (this: TypeService, data: ICreateTypeData) {
    const type = this.typeDomainService.add(TypeFactory.mapDataToDTO(data))

    yield* _await(this.typeRepository.add(type))

    this.paginationService.dataRefs.set(type.id, typeRef(type))

    return type
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: TypeService, types: Array<ITypeModel>) {
    const deleteType = async (type: ITypeModel) => {
      const { id } = type

      this.typeDomainService.types.delete(id)

      await this.typeRepository.delete([type])
    }

    yield* _await(Promise.all(types.map((type) => deleteType(type))))

    return
  })

  /**
   * fetches the types with the given ids
   * while loading all their descendant types
   * @returns only the types having their id in ids
   */
  @modelFlow
  @transaction
  getAll = _async(function* (this: TypeService, ids?: Array<string>) {
    // If `getAll` is called without `ids`, all types should be cached already
    // New created types should be added to the cache so it should be included in the list
    if (this.allTypesLoaded) {
      if (!ids) {
        return this.typeDomainService.typesList
      }

      const storedTypes = compact(
        ids.map((id) => this.typeDomainService.types.get(id)),
      )

      if (storedTypes.length !== ids.length) {
        throw new Error('Some types are not found.')
      }

      return storedTypes
    }

    const existingTypes = compact(
      ids?.map((id) => this.typeDomainService.types.get(id)) ?? [],
    )

    const idsToLoad = ids?.filter((id) => this.shouldLoadType(id))
    let newTypes: Array<ITypeModel> = []

    // Undefined `ids` should get to this point one time only
    // We also dont need to include types already in the cache
    if (idsToLoad?.length || !ids) {
      const { items: typeFragments } = yield* _await(
        this.typeRepository.find({ id_IN: idsToLoad }),
      )

      const parentIds = typeFragments.map((typeFragment) => typeFragment.id)

      // load the descendants of the requested types
      // we dont need to get the descendants if all types are requested i.e. no `ids` provided
      const descendantTypeFragments = ids
        ? yield* _await(this.typeRepository.findDescendants(parentIds))
        : []

      const newFragments = [...typeFragments, ...descendantTypeFragments]

      // dont include descendant types and return only requested types unless all is requested i.e. no `ids`
      newTypes = compact(
        newFragments.map((typeFragment) => {
          if (typeFragment.__typename === TypeKind.InterfaceType) {
            typeFragment.fields.forEach((fieldFragment) => {
              this.fieldService.add(fieldFragment)
            })
          }

          const newType = this.typeDomainService.add(typeFragment)

          return idsToLoad?.includes(typeFragment.id) || !ids
            ? newType
            : undefined
        }),
      )
    }

    const allTypes = [...existingTypes, ...newTypes]
    const result = sortBy(allTypes, ({ name }) => name.toLowerCase())

    // This means all types has been fetched and stored in the cache
    // so there is no need to run the whole function anymore
    if (!ids) {
      this.allTypesLoaded = true
    }

    return result
  })

  /**
   * A wrapper around getAll with some type checking.
   * Gets the interface while loading its descendant types
   */
  @modelFlow
  @transaction
  getInterface = _async(function* (
    this: TypeService,
    interfaceTypeId: IInterfaceTypeRef,
  ) {
    const interfaceFromStore = this.type(interfaceTypeId)

    if (
      interfaceFromStore &&
      interfaceFromStore.kind === ITypeKind.InterfaceType &&
      !this.shouldLoadType(interfaceTypeId)
    ) {
      return interfaceFromStore
    }

    const [interfaceType] = yield* _await(this.getAll([interfaceTypeId]))

    if (!interfaceType) {
      throw new Error('Type not found')
    }

    if (interfaceType.kind !== ITypeKind.InterfaceType) {
      throw new Error('Type is not an interface')
    }

    return interfaceType
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: TypeService, id: string) {
    if (!this.shouldLoadType(id)) {
      return this.typeDomainService.types.get(id)
    }

    const all = yield* _await(this.getAll([id]))

    return all[0]
  })

  @modelFlow
  getOptions = _async(function* (this: TypeService) {
    const options = yield* _await(this.typeRepository.findOptions())

    return options
  })

  @modelFlow
  @transaction
  update = _async(function* (this: TypeService, data: IUpdateTypeData) {
    const type = this.typeDomainService.types.get(data.id)!
    const typeDTO = TypeFactory.mapDataToDTO(data)

    TypeFactory.writeCache(typeDTO, type)

    yield* _await(this.typeRepository.update(type))

    return type
  })

  @modelAction
  add(typeDTO: ITypeDTO) {
    const existingType = this.types.get(typeDTO.id)

    if (existingType) {
      return existingType
    }

    const type = TypeFactory.create(typeDTO)

    this.types.set(type.id, type)

    return type
  }

  @modelAction
  addInterface(data: ICreateTypeData) {
    const interfaceType = new InterfaceType({
      id: data.id,
      name: data.name,
    })

    this.types.set(interfaceType.id, interfaceType)

    return interfaceType
  }

  @modelAction
  addTypeLocal(type: IType) {
    this.types.set(type.id, type)
  }

  /**
   * Caches all types into mobx
   */
  @modelAction
  loadTypes(types: Partial<GetTypesQuery>) {
    console.debug('TypeService.loadTypes()', types)

    const flatTypes = Object.values(types).flat()
    this.fieldService.load(
      (types.interfaceTypes || []).flatMap((fragment) => fragment.fields),
    )

    const loadedTypes = flatTypes.map((fragment) =>
      TypeFactory.create(fragment),
    )

    for (const type of loadedTypes) {
      this.types.set(type.id, type)
    }

    return loadedTypes
  }

  @modelAction
  primitiveKind(id: string): Nullable<IPrimitiveTypeKind> {
    const type = this.type(id)

    if (type?.kind === ITypeKind.PrimitiveType) {
      return type.primitiveKind
    }

    return null
  }

  @modelAction
  type(id: string) {
    return this.types.get(id)
  }

  getType(id: string) {
    return this.types.get(id)
  }

  onAttachedToRootStore() {
    this.paginationService.getDataFn = async (page, pageSize, filter) => {
      const { items: baseTypes, totalCount: totalItems } =
        await this.typeRepository.findBaseTypes({
          limit: pageSize,
          offset: (page - 1) * pageSize,
          where: filter,
        })

      const typeIds = baseTypes.map(({ id }) => id)
      const items = await this.getAll(typeIds)

      return { items, totalItems }
    }
  }

  /**
   * Caches all types into mobx
   */
  @modelAction
  loadTypes(types: Partial<GetTypesQuery>) {
    console.debug('TypeService.loadTypes()', types)

    const flatTypes = Object.values(types).flat()

    this.fieldService.load(
      (types.interfaceTypes || []).flatMap((fragment) => fragment.fields),
    )

    const loadedTypes = flatTypes.map((fragment) =>
      TypeFactory.create(fragment),
    )

    for (const type of loadedTypes) {
      this.typeDomainService.types.set(type.id, type)
    }

    return loadedTypes
  }

  @modelAction
  primitiveKind(id: string): Nullable<IPrimitiveTypeKind> {
    const type = this.type(id)

    if (type?.kind === ITypeKind.PrimitiveType) {
      return type.primitiveKind
    }

    return null
  }

  @modelAction
  type(id: string) {
    return this.typeDomainService.types.get(id)
  }

  getType(id: string) {
    return this.typeDomainService.types.get(id)
  }

  onAttachedToRootStore() {
    this.paginationService.getDataFn = async (page, pageSize, filter) => {
      const { items: baseTypes, totalCount: totalItems } =
        await this.typeRepository.findBaseTypes({
          limit: pageSize,
          offset: (page - 1) * pageSize,
          where: filter,
        })

      const typeIds = baseTypes.map(({ id }) => id)
      const items = await this.getAll(typeIds)

      return { items, totalItems }
    }
  }

  /**
   * Decides whether loading the type is necessary or not.
   * loading is required if the type of any of its descendant
   * types are not available in the cache.
   */
  shouldLoadType(typeId: string) {
    const type = this.typeDomainService.types.get(typeId)

    if (!type) {
      return true
    }

    if (type.kind === TypeKind.InterfaceType) {
      for (const field of type.fields) {
        if (
          !field.type.maybeCurrent ||
          this.shouldLoadType(field.type.maybeCurrent.id)
        ) {
          return true
        }
      }
    }

    if (type.kind === TypeKind.ArrayType) {
      if (
        !type.itemType?.maybeCurrent ||
        this.shouldLoadType(type.itemType.maybeCurrent.id)
      ) {
        return true
      }
    }

    if (type.kind === TypeKind.UnionType) {
      for (const typeOfUnion of type.typesOfUnionType) {
        if (
          !typeOfUnion.maybeCurrent ||
          this.shouldLoadType(typeOfUnion.maybeCurrent.id)
        ) {
          return true
        }
      }
    }

    return false
  }

  @computed
  private get fieldService() {
    return getFieldService(this)
  }
}
