import { getElementService } from '@codelab/frontend/presenter/container'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { TypeBaseWhere } from '@codelab/shared/abstract/codegen'
import type {
  IAnyType,
  ICreateFieldDTO,
  ICreateTypeDTO,
  IFieldRef,
  IInterfaceType,
  IInterfaceTypeRef,
  ITypeDTO,
  ITypeService,
  IUpdateFieldDTO,
  IUpdateTypeDTO,
} from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { flatMap, mapKeys, merge, omit } from 'lodash'
import { computed } from 'mobx'
import {
  _async,
  _await,
  arraySet,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { GetTypesQuery } from '../graphql/get-type.endpoints.graphql.gen'
import { createTypeFactory, updateTypeInputFactory } from '../use-cases/types'
import { fieldApi } from './apis/field.api'
import {
  createTypeApi,
  deleteTypeApi,
  getAllTypes,
  getTypeApi,
  updateTypeApi,
} from './apis/type.api'
import { FieldModalService } from './field.service'
import type { AnyType } from './models'
import { typeFactory } from './type.factory'
import {
  InterfaceTypeModalService,
  TypeModalService,
} from './type-modal.service'

@model('@codelab/TypeService')
export class TypeService
  extends Model({
    types: prop(() => objectMap<AnyType>()),

    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new TypeModalService({})),
    deleteModal: prop(() => new TypeModalService({})),

    selectedIds: prop(() => arraySet<string>()).withSetter(),

    fieldCreateModal: prop(() => new InterfaceTypeModalService({})),
    fieldUpdateModal: prop(() => new FieldModalService({})),
    fieldDeleteModal: prop(() => new FieldModalService({})),

    interfaceDefaultsModal: prop(() => new TypeModalService({})),
  })
  implements ITypeService
{
  @computed
  get typesList() {
    return [...this.types.values()]
  }

  @computed
  get elementService() {
    return getElementService(this)
  }

  type(id: string) {
    return this.types.get(id)
  }

  /**
   * Caches all types into mobx
   */
  @modelAction
  load = (types: GetTypesQuery) => {
    console.debug('TypeService.cacheAll', types)

    const flatTypes = Object.values(types).flat()

    return flatTypes.map((type) => this.writeCache(type))
  }

  @modelAction
  addTypeLocal(type: AnyType) {
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
    }

    return typeModel
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: TypeService,
    type: IAnyType,
    data: IUpdateTypeDTO,
  ) {
    const args = {
      where: { id: type.id },
      ...updateTypeInputFactory(data),
    }

    const [updatedType] = yield* _await(updateTypeApi[type.kind](args))

    if (!updatedType) {
      throw new Error('Type was not updated')
    }

    return this.writeCache(updatedType)
  })

  @modelFlow
  @transaction
  getTypesOfTypesPage = _async(function* (this: TypeService) {
    const { typesOfTypesPage } = yield* _await(getTypeApi.GetTypesOfTypesPage())

    typesOfTypesPage.map((type) => {
      try {
        const typeModel = typeFactory(type)
        console.log({ typeModel })

        this.types.set(type.id, typeModel)

        return typeModel
      } catch (err) {
        console.log({ err })
      }
    })

    return typesOfTypesPage
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: TypeService, where?: TypeBaseWhere) {
    const ids = where?.id_IN ?? undefined
    // const idsToFetch = ids?.filter((id) => !this.types.has(id))
    const types = yield* _await(getAllTypes(ids))

    return types.map((type) => {
      const typeModel = typeFactory(type)

      this.types.set(type.id, typeModel)

      return typeModel
    })
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: TypeService, id: string) {
    if (this.types.has(id)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.types.get(id)!
    }

    const all = yield* _await(this.getAll({ id_IN: [id] }))

    return all[0]
  })

  @modelFlow
  @transaction
  getAllWithDescendants = _async(function* (
    this: TypeService,
    ids: Array<string>,
  ) {
    if (!ids?.length) {
      return []
    }

    const descendants = yield* _await(getTypeApi.GetDescendants({ ids }))

    const allDescendantIds = Object.values(descendants).reduce(
      (acc, v) => [...acc, ...flatMap(v, (item) => item.descendantTypesIds)],
      [] as Array<string>,
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

    return interfaceType as IInterfaceType
  })

  /*
   * The array of types must be of same type
   *
   * Issue with interfaceType & fieldConnections variable getting repeated in Neo4j if we create multiple at a time.
   */
  @modelFlow
  @transaction
  create = _async(function* (
    this: TypeService,
    data: Array<ICreateTypeDTO> = [],
  ) {
    if (!data.length) {
      return []
    }

    const input = createTypeFactory(data)
    const types = yield* _await(createTypeApi[data[0].kind](input))

    if (!types.length) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Type was not created')
    }

    return types.map((type) => {
      const typeModel = typeFactory(type)

      this.types.set(type.id, typeModel)

      return typeModel
    })
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: TypeService, id: string) {
    const type = this.types.get(id)

    if (!type) {
      throw new Error('Type does not exist')
    }

    this.types.delete(id)

    const { nodesDeleted } = yield* _await(
      deleteTypeApi[type.kind]({ where: { id } }),
    )

    if (nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Type was not deleted')
    }

    return type
  })

  //
  // The field actions are here because if I put them in InterfaceType
  // some kind of circular dependency happens that breaks the actions in weird and unpredictable ways
  //
  @modelFlow
  @transaction
  addField = _async(function* (
    this: TypeService,
    interfaceTypeId: IInterfaceTypeRef,
    data: ICreateFieldDTO,
  ) {
    const input = {
      interfaceTypeId,
      fieldTypeId: data.fieldType,
      field: {
        description: data.description,
        id: data.id,
        key: data.key,
        name: data.name,
      },
    }

    yield* _await(fieldApi.UpsertField(input))

    const interfaceType = yield* _await(
      this.updateDefaults(interfaceTypeId, data.key, null),
    )

    return interfaceType
  })

  @modelFlow
  @transaction
  updateField = _async(function* (
    this: TypeService,
    interfaceTypeId: IInterfaceTypeRef,
    targetKey: IInterfaceTypeRef,
    data: IUpdateFieldDTO,
  ) {
    const interfaceType = throwIfUndefined(this.type(interfaceTypeId))

    assertIsTypeKind(interfaceType.kind, ITypeKind.InterfaceType)

    const field = throwIfUndefined(interfaceType.field(data.id))

    const input = {
      interfaceTypeId,
      fieldTypeId: data.fieldType,
      field: {
        id: data.id,
        description: data.description,
        key: data.key,
        name: data.name,
      },
    }

    const { upsertField } = yield* _await(fieldApi.UpsertField(input))

    yield* _await(this.updateDefaults(interfaceTypeId, data.key, field.key))

    const updatedField = upsertField.fieldsConnection.edges[0]

    field.writeCache(updatedField)

    return field
  })

  @modelFlow
  @transaction
  updateDefaults = _async(function* (
    this: TypeService,
    interfaceId: string,
    addedKey: Nullable<string>,
    removedKey: Nullable<string>,
  ) {
    const interfaceType = throwIfUndefined(this.type(interfaceId))
    assertIsTypeKind(interfaceType.kind, ITypeKind.InterfaceType)

    let data = {}

    if (addedKey && removedKey) {
      // update key
      data = mapKeys(interfaceType.defaults, (value, key) =>
        key === removedKey ? addedKey : key,
      )
    } else if (addedKey) {
      // add key
      data = merge(interfaceType.defaults, { [addedKey]: null })
    } else if (removedKey) {
      // remove key
      data = omit(interfaceType.defaults, [removedKey])
    }

    const updateInput = {
      id: interfaceType.id,
      kind: interfaceType.kind,
      name: interfaceType.name,
      interfaceDefaults: {
        auth0Id: interfaceType.ownerAuthId,
        data,
      },
    }

    yield* _await(this.update(interfaceType, updateInput))

    return interfaceType
  })

  @modelFlow
  @transaction
  deleteField = _async(function* (
    this: TypeService,
    interfaceId: IInterfaceTypeRef,
    fieldId: IFieldRef,
  ) {
    const interfaceType = throwIfUndefined(this.type(interfaceId))

    assertIsTypeKind(interfaceType.kind, ITypeKind.InterfaceType)

    const field = interfaceType.field(fieldId)

    if (!field) {
      return
    }

    const input = { where: { id: fieldId }, interfaceId }
    const res = yield* _await(fieldApi.DeleteField(input))

    yield* _await(this.updateDefaults(interfaceId, null, field.key))

    yield* _await(
      this.elementService.removeDeletedPropDataFromElements(
        interfaceType,
        field.key,
      ),
    )

    // Returns current edges, not deleted edges
    // const deletedField =
    //   res.updateInterfaceTypes.interfaceTypes[0].fieldsConnection.edges[0]
    //
    // if (!deletedField) {
    //   throw new Error(`Failed to delete field with id ${fieldId}`)
    // }

    interfaceType.deleteFieldLocal(field)

    return field
  })
}
