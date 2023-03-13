import type {
  IInterfaceType,
  IInterfaceTypeRef,
  ITypeService,
  IUpdateTypeData,
} from '@codelab/frontend/abstract/core'
import {
  IType,
  ICreateTypeData,
  ITypeDTO,
} from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type {
  BaseTypeWhere,
  FieldFragment,
} from '@codelab/shared/abstract/codegen'
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
import { GetTypesQuery } from '../graphql/get-type.endpoints.graphql.gen'
import { TypeRepository } from '../services'
import { getTypeApi } from './apis/type.api'
import { baseTypesFactory } from './base-types.factory'
import { getFieldService } from './field.service.context'
import { InterfaceType } from './models'
import { TypeFactory } from './type.factory'
import { TypeModalService } from './type-modal.service'

@model('@codelab/TypeService')
export class TypeService
  extends Model({
    count: prop(() => 0),

    createModal: prop(() => new ModalService({})),

    deleteModal: prop(() => new TypeModalService({})),

    id: idProp,

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
  /**
   * `page` & `pageSize` are optional
   */
  @modelFlow
  @transaction
  getBaseTypes = _async(function* (
    this: TypeService,
    { limit, offset, where },
  ) {
    const {
      baseTypes: { items, totalCount },
    } = yield* _await(
      getTypeApi.GetBaseTypes({
        options: {
          limit,
          offset,
          where,
        },
      }),
    )

    this.count = totalCount

    return items.map((type) => {
      const typeModel = baseTypesFactory(type)
      this.types.set(type.id, typeModel)

      return typeModel.id
    })
  })

  @computed
  private get fieldService() {
    return getFieldService(this)
  }

  @computed
  get typesList() {
    // loading sub types messes up the order of the next page
    // we need to sort here to make sure the types on the
    // table are always sorted alphabetically
    return [...this.types.values()].sort((typeA, typeB) =>
      typeA.name.toLowerCase() < typeB.name.toLowerCase() ? -1 : 1,
    )
  }

  // @modelAction
  // create(data: ICreateTypeDTO) {
  //   const interfaceType = new InterfaceType({
  //     name: data.name,
  //     owner: data.owner,
  //   })

  //   this.types.set(interfaceType.id, interfaceType)

  //   return interfaceType
  // }

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
  loadTypes = (types: GetTypesQuery) => {
    const flatTypes = Object.values(types).flat()

    const loadedTypes = flatTypes.map((fragment) =>
      TypeFactory.create(fragment),
    )

    this.types = objectMap(
      loadedTypes.map((typeModel) => [typeModel.id, typeModel]),
    )

    return loadedTypes
  }

  @modelAction
  loadFields = (types: GetTypesQuery['interfaceTypes']) => {
    const flatTypes = Object.values(types).flat()
    const fields: Array<FieldFragment> = []

    flatTypes.forEach((fragment) => {
      fields.push(...fragment.fields)
    })

    this.fieldService.load(fields)
  }

  @modelAction
  addTypeLocal(type: IType) {
    this.types.set(type.id, type)
  }

  @modelAction
  add(typeDTO: ITypeDTO) {
    const type = TypeFactory.create(typeDTO)
    this.types.set(type.id, type)

    // Write cache to the fields
    if (
      type.kind === ITypeKind.InterfaceType &&
      typeDTO.__typename === 'InterfaceType'
    ) {
      type.writeFieldCache(typeDTO.fields)
    }

    return type
  }

  @modelAction
  loadTypesByChunks(this: TypeService, types: GetTypesQuery) {
    // type loading is quiet a heavy operation which takes up to 500ms of blocking time.
    // split types loading into many chunks and queue each of them as a macrotask.
    // this will unblock UI and allow other js to execute between them, which makes UI much more responsive.
    this.loadFields(types.interfaceTypes)

    this.loadTypes(types)

    Object.values(types.interfaceTypes).map((type) => {
      const typeModel = this.type(type.id) as IInterfaceType

      typeModel.load(type.fields)
    })
  }

  @modelFlow
  @transaction
  update = _async(function* (this: TypeService, data: IUpdateTypeData) {
    const type = this.add(TypeFactory.mapDataToDTO(data))

    yield* _await(this.typeRepository.update(type))

    return type
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: TypeService, where?: BaseTypeWhere) {
    const typeFragments = yield* _await(this.typeRepository.find(where || {}))

    return (
      typeFragments
        .map((typeFragment) => {
          return this.add(typeFragment)
        })
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

    const all = yield* _await(this.getAll({ id_IN: [id] }))

    return all[0]
  })

  @modelFlow
  @transaction
  getAllWithDescendants = _async(function* (
    this: TypeService,
    ids: Array<string> = [],
  ) {
    const { arrayTypes, interfaceTypes, unionTypes } = yield* _await(
      getTypeApi.GetDescendants({ ids }),
    )

    const allDescendantIds = [
      ...arrayTypes,
      ...unionTypes,
      ...interfaceTypes,
    ].reduce<Array<string>>(
      (descendantIds, { descendantTypesIds }) => [
        ...descendantIds,
        ...descendantTypesIds.flat(),
      ],
      [],
    )

    // remove duplicates
    const allIds = [...new Set([...ids, ...allDescendantIds])]

    return yield* _await(this.getAll({ id_IN: allIds }))
  })

  /**
   * A wrapper around getAllWithDescendants with some type checking
   */
  @modelFlow
  @transaction
  getInterfaceAndDescendants = _async(function* (
    this: TypeService,
    interfaceTypeId: IInterfaceTypeRef,
  ) {
    const interfaceWithDescendants = yield* _await(
      this.getAllWithDescendants([interfaceTypeId]),
    )

    const interfaceType = interfaceWithDescendants.find(
      ({ id }) => id === interfaceTypeId,
    )

    if (!interfaceType) {
      throw new Error('Type not found')
    }

    if (interfaceType.kind !== ITypeKind.InterfaceType) {
      throw new Error('Type is not an interface')
    }

    return interfaceType
  })

  /*
   */
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
