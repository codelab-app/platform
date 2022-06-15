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
import { flatMap } from 'lodash'
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
  })
  implements ITypeService
{
  @computed
  get typesList() {
    return [...this.types.values()]
  }

  type(id: string) {
    return this.types.get(id)
  }

  @modelAction
  addTypeLocal(type: AnyType) {
    this.types.set(type.id, type)
  }

  @modelAction
  updateCache(fragment: ITypeDTO) {
    let typeModel = this.types.get(fragment.id)

    if (typeModel) {
      typeModel.updateCache(fragment)
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

    return this.updateCache(updatedType)
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: TypeService, where?: TypeBaseWhere) {
    const ids = where?.id_IN ?? undefined
    // Work on caching later
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

    const { upsertField } = yield* _await(fieldApi.UpsertField(input))
    const interfaceTypeDTO = upsertField
    const interfaceType = throwIfUndefined(this.type(interfaceTypeId))

    assertIsTypeKind(interfaceType.kind, ITypeKind.InterfaceType)

    interfaceType.updateCache(interfaceTypeDTO)

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
    const updatedField = upsertField.fieldsConnection.edges[0]

    field.updateCache(updatedField)

    return field
  })

  @modelFlow
  @transaction
  deleteField = _async(function* (
    this: TypeService,
    interfaceTypeId: IInterfaceTypeRef,
    fieldId: IFieldRef,
  ) {
    const interfaceType = throwIfUndefined(this.type(interfaceTypeId))

    assertIsTypeKind(interfaceType.kind, ITypeKind.InterfaceType)

    const field = interfaceType.field(fieldId)

    if (!field) {
      return
    }

    const input = { where: { id: fieldId }, interfaceId: interfaceTypeId }
    const res = yield* _await(fieldApi.DeleteField(input))

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
