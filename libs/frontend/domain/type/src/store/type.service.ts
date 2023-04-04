import type {
  IInterfaceTypeRef,
  ITypeService,
  IUpdateTypeData,
} from '@codelab/frontend/abstract/core'
import {
  ICreateTypeData,
  IType,
  ITypeDTO,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import { TypeKind } from '@codelab/shared/abstract/codegen'
import type { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  arraySet,
  idProp,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import type { GetTypesQuery } from '../graphql/get-type.endpoints.graphql.gen'
import { TypeRepository } from '../services'
import { getFieldService } from './field.service.context'
import { InterfaceType } from './models'
import { TypeFactory } from './type.factory'
import { TypeModalService } from './type-modal.service'
import { TypePaginationService } from './type-pagination.service'

@model('@codelab/TypeService')
export class TypeService
  extends Model({
    createModal: prop(() => new ModalService({})),
    /**
     * Used to show current paginated types
     */
    deleteModal: prop(() => new TypeModalService({})),
    id: idProp,
    pagination: prop(() => new TypePaginationService({})),
    selectedIds: prop(() => arraySet<string>()).withSetter(),
    typeRepository: prop(() => new TypeRepository({})),
    /**
     * This holds all types
     */
    types: prop(() => objectMap<IType>()),
    updateModal: prop(() => new TypeModalService({})),
  })
  implements ITypeService
{
  @computed
  private get fieldService() {
    return getFieldService(this)
  }

  @computed
  get typesList() {
    // loading sub types messes up the order of the next page
    // we need to sort here to make sure the types on the
    // table are always sorted alphabetically
    return Array.from(this.types.values()).sort((typeA, typeB) =>
      typeA.name.toLowerCase() < typeB.name.toLowerCase() ? -1 : 1,
    )
  }

  @modelAction
  addInterface(data: ICreateTypeData) {
    const interfaceType = new InterfaceType({
      id: data.id,
      name: data.name,
      owner: data.owner,
    })

    this.types.set(interfaceType.id, interfaceType)

    return interfaceType
  }

  @modelAction
  type(id: string) {
    return this.types.get(id)
  }

  @modelAction
  primitiveKind(id: string): Nullable<IPrimitiveTypeKind> {
    const type = this.type(id)

    if (type?.kind === ITypeKind.PrimitiveType) {
      return type.primitiveKind
    }

    return null
  }

  /**
   * Caches all types into mobx
   */
  @modelAction
  loadTypes = (types: Partial<GetTypesQuery>) => {
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
  addTypeLocal(type: IType) {
    this.types.set(type.id, type)
  }

  @modelAction
  add(typeDTO: ITypeDTO) {
    const type = TypeFactory.create(typeDTO)

    this.types.set(type.id, type)

    return type
  }

  @modelFlow
  @transaction
  update = _async(function* (this: TypeService, data: IUpdateTypeData) {
    const type = this.types.get(data.id)!
    const typeDTO = TypeFactory.mapDataToDTO(data)
    TypeFactory.writeCache(typeDTO, type)

    yield* _await(this.typeRepository.update(type))

    return type
  })

  /**
   * fetches the types with the given ids
   * while loading all their descendant types
   * @returns only the types having their id in ids
   */
  @modelFlow
  @transaction
  getAll = _async(function* (this: TypeService, ids: Array<string>) {
    const typeFragments = yield* _await(
      this.typeRepository.find({ id_IN: ids }),
    )

    const parentIds = typeFragments.map((typeFragment) => typeFragment.id)

    // load the descendants of the requested types
    const descendantTypeFragments = yield* _await(
      this.typeRepository.findDescendants(parentIds),
    )

    const allFragments = [...typeFragments, ...descendantTypeFragments]

    // initialize fields
    allFragments.forEach((typeFragment) => {
      if (typeFragment.__typename === TypeKind.InterfaceType) {
        typeFragment.fields.forEach((fieldFragment) => {
          this.fieldService.add(fieldFragment)
        })
      }
    })

    return (
      allFragments
        .map((typeFragment) => {
          return this.add(typeFragment)
        })
        // return only the requested types
        .filter((type) => ids.includes(type.id))
        // Sort the most recently fetched types
        .sort((typeA, typeB) =>
          typeA.name.toLowerCase() < typeB.name.toLowerCase() ? -1 : 1,
        )
    )
  })

  getType(id: string) {
    return this.types.get(id)
  }

  @modelFlow
  @transaction
  getOne = _async(function* (this: TypeService, id: string) {
    if (this.types.has(id)) {
      return this.types.get(id)
    }

    const all = yield* _await(this.getAll([id]))

    return all[0]
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
      interfaceFromStore.kind === ITypeKind.InterfaceType
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
  create = _async(function* (this: TypeService, data: ICreateTypeData) {
    const type = this.add(TypeFactory.mapDataToDTO(data))

    yield* _await(this.typeRepository.add(type))

    return type
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: TypeService, type: IType) {
    const { id } = type
    this.types.delete(id)

    yield* _await(this.typeRepository.delete([type]))

    return type
  })
}
