import type {
  ICreateTypeDTO,
  IInterfaceTypeRef,
  ITypeService,
  IUpdateTypeDTO,
} from '@codelab/frontend/abstract/core'
import { IAnyType, ITypeDTO } from '@codelab/frontend/abstract/core'
import { ModalService } from '@codelab/frontend/shared/utils'
import type {
  BaseTypeOptions,
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
import type { GetTypesQuery } from '../graphql/get-type.endpoints.graphql.gen'
import { createTypeFactory, updateTypeInputFactory } from '../use-cases'
import {
  createTypeApi,
  deleteTypeApi,
  getAllTypes,
  getTypeApi,
  updateTypeApi,
} from './apis/type.api'
import { baseTypesFactory } from './base-types.factory'
import { getFieldService } from './field.service.context'
import { typeFactory } from './type.factory'
import { TypeModalService } from './type-modal.service'

@model('@codelab/TypeService')
export class TypeService
  extends Model({
    id: idProp,
    /**
     * This holds all types
     */
    types: prop(() => objectMap<IAnyType>()),
    count: prop(() => 0),

    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new TypeModalService({})),
    deleteModal: prop(() => new TypeModalService({})),

    selectedIds: prop(() => arraySet<string>()).withSetter(),
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
    { offset, limit, where },
  ) {
    const {
      baseTypes: { totalCount, items },
    } = yield* _await(
      getTypeApi.GetBaseTypes({
        options: {
          offset,
          limit,
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
    return [...this.types.values()]
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
    const loadedTypes = flatTypes.map((fragment) => typeFactory(fragment))

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
  addTypeLocal(type: IAnyType) {
    this.types.set(type.id, type)
  }

  @modelAction
  writeCache(fragment: ITypeDTO) {
    let typeModel = this.types.get(fragment.id)

    if (typeModel) {
      typeModel.writeCache(fragment)
    } else {
      typeModel = typeFactory(fragment)
      this.types.set(fragment.id, typeModel)

      // Write cache writes to the fields
      if (
        typeModel.kind === ITypeKind.InterfaceType &&
        fragment.__typename === 'InterfaceType'
      ) {
        typeModel.writeFieldCache(fragment.fields)
      }
    }

    return typeModel
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: TypeService,
    entity: IAnyType,
    data: IUpdateTypeDTO,
  ) {
    const args = {
      where: { id: entity.id },
      ...updateTypeInputFactory(data),
    }

    const updatedTypes = yield* _await(updateTypeApi[entity.kind](args))

    return updatedTypes.map((type) => this.writeCache(type))
  })

  @modelFlow
  @transaction
  getAll = _async(function* (
    this: TypeService,
    where?: BaseTypeWhere,
    options?: BaseTypeOptions,
  ) {
    const ids = yield* _await(
      this.getBaseTypes({
        where: {
          name: where?.name,
        },
        offset: options?.offset,
        limit: options?.limit,
      }),
    )

    const allIds = [...ids, ...(where?.id_IN || [])]
    const types = yield* _await(getAllTypes(allIds))

    return types.map((type) => {
      return this.writeCache(type)
    })
  })

  getType(id: string) {
    return this.types.get(id)
  }

  @modelFlow
  @transaction
  getOne = _async(function* (this: TypeService, id: string) {
    let type = this.types.get(id)

    if (!type) {
      ;[type] = yield* _await(this.getAll({ id_IN: [id] }))
    }

    if (!type) {
      throw new Error(`Type with id ${id} not found`)
    }

    if (type.kind === ITypeKind.InterfaceType && type.fields.length) {
      const subTypesIds = type.fields
        .filter((field) => !this.types.has(field.type.id))
        .map((field) => field.type.id)

      const types = yield* _await(getAllTypes(subTypesIds))
      types.map((_type) => {
        return this.writeCache(_type)
      })
    }

    return type
  })

  @modelFlow
  @transaction
  getAllWithDescendants = _async(function* (
    this: TypeService,
    ids: Array<string> = [],
  ) {
    const { arrayTypes, unionTypes, interfaceTypes } = yield* _await(
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
    id: IInterfaceTypeRef,
  ) {
    const interfaceAndDescendants = yield* _await(
      this.getAllWithDescendants([id]),
    )

    const interfaceType = interfaceAndDescendants.find((x) => x.id === id)

    if (!interfaceType) {
      throw new Error('Type not found')
    }

    if (interfaceType.kind !== ITypeKind.InterfaceType) {
      throw new Error('Type is not an interface')
    }

    return interfaceType
  })

  /*
   * The array of types must be of same type
   *
   * Issue with interfaceType & fieldConnections variable getting repeated in Neo4j if we create multiple at a time.
   */
  @modelFlow
  @transaction
  create = _async(function* (this: TypeService, data: Array<ICreateTypeDTO>) {
    const input = createTypeFactory(data)

    const types: Array<ITypeDTO> = yield* _await(
      Promise.all(
        input.map((type) => {
          if (!type.kind) {
            throw new Error('Type requires a kind')
          }

          return createTypeApi[type.kind](input)
        }),
      ).then((res) => res.flat()),
    )

    return types.map((type) => this.writeCache(type))
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: TypeService, ids: Array<string>) {
    const types = ids
      .map((id) => this.types.get(id))
      .filter((type): type is IAnyType => Boolean(type))

    ids.forEach((id) => this.types.delete(id))

    const results = yield* _await(
      Promise.all(
        types.map((type) =>
          deleteTypeApi[type.kind]({ where: { id: type.id } }),
        ),
      ),
    )

    return results.reduce((total, { nodesDeleted }) => nodesDeleted + total, 0)
  })
}
