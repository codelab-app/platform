import { ModalService } from '@codelab/frontend/shared/utils'
import { InterfaceTypeWhere } from '@codelab/shared/abstract/codegen-v2'
import { TypeKind } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
  arraySet,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { fieldApi } from './apis/field.api'
import {
  createTypeApi,
  CreateTypeInput,
  deleteTypeApi,
  getAllTypes,
  getTypeApi,
} from './apis/type.api'
import { FieldModalService } from './field.service'
import {
  AnyType,
  CreateFieldInput,
  InterfaceType,
  UpdateFieldInput,
} from './models'
import { typeFactory } from './type.factory'
import {
  InterfaceTypeModalService,
  TypeModalService,
} from './type-modal.service'

export type WithTypeService = {
  typeService: TypeService
}

@model('codelab/TypeService')
export class TypeService extends Model({
  types: prop(() => objectMap<AnyType>()),

  createModal: prop(() => new ModalService({})),
  updateModal: prop(() => new TypeModalService({})),
  deleteModal: prop(() => new TypeModalService({})),

  selectedIds: prop(() => arraySet<string>()).withSetter(),

  fieldCreateModal: prop(() => new InterfaceTypeModalService({})),
  fieldUpdateModal: prop(() => new FieldModalService({})),
  fieldDeleteModal: prop(() => new FieldModalService({})),
}) {
  @computed
  get typesList() {
    return [...this.types.values()]
  }

  type(id: string) {
    return this.types.get(id)
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: TypeService, ids?: Array<string>) {
    const types = yield* _await(getAllTypes(ids))

    return types.map((type) => {
      if (this.types.has(type.id)) {
        return this.types.get(type.id)
      }

      const typeModel = typeFactory(type)
      this.types.set(type.id, typeModel)

      return typeModel
    })
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: TypeService, id: string) {
    if (this.types.has(id)) {
      return this.types.get(id)
    }

    const all = yield* _await(this.getAll([id]))

    return all[0]
  })

  @modelFlow
  @transaction
  getInterfaceAndDescendants = _async(function* (
    this: TypeService,
    where: InterfaceTypeWhere,
  ) {
    const {
      types: [interfaceType],
    } = yield* _await(getTypeApi.GetInterfaceTypes({ where }))

    if (!interfaceType) {
      return null
    }

    if (interfaceType?.typeKind !== TypeKind.InterfaceType) {
      throw new Error(`Type is not an interface`)
    }

    // Get all descendant types so that we don't get unknown references
    const ids = interfaceType.descendantTypesIds.filter(
      (id) => !this.types.has(id),
    )

    yield* _await(this.getAll(ids))

    let itModel = this.types.get(interfaceType.id) as InterfaceType | undefined

    if (!itModel) {
      itModel = InterfaceType.fromFragment(interfaceType)
      this.types.set(interfaceType.id, itModel)
    }

    return itModel
  })

  @modelFlow
  @transaction
  create = _async(function* (
    this: TypeService,
    typeKind: TypeKind,
    input: CreateTypeInput,
  ) {
    console.log(input)

    const [type] = yield* _await(createTypeApi[typeKind](input))

    if (!type) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Type was not created')
    }

    const typeModel = typeFactory(type)

    this.types.set(type.id, typeModel)

    return typeModel
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: TypeService, id: string) {
    const type = this.types.get(id)

    this.types.delete(id)

    if (!type) {
      throw new Error('Type does not exist')
    }

    const { nodesDeleted } = yield* _await(
      deleteTypeApi[type.typeKind]({ where: { id } }),
    )

    if (nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Type was not deleted')
    }

    return { nodesDeleted }
  })

  //
  //  The field actions are here because if I put them in InterfaceType
  // some kind of circular dependency happens that breaks the actions in weird and unpredictable ways
  //

  @modelFlow
  @transaction
  addField = _async(function* (
    this: TypeService,
    interfaceType: InterfaceType,
    input: CreateFieldInput,
  ) {
    const { existingTypeId, name, description, key } = input

    const createInput = {
      interfaceTypeId: interfaceType.id,
      key,
      name,
      description,
      targetTypeId: existingTypeId,
    }

    const res = yield* _await(fieldApi.CreateField({ input: createInput }))
    const field = interfaceType.addFieldLocal(res.upsertFieldEdge)

    field.updateFromFragment(res.upsertFieldEdge, interfaceType.id)

    return field
  })

  @modelFlow
  @transaction
  updateField = _async(function* (
    this: TypeService,
    interfaceType: InterfaceType,
    targetKey: string,
    { key, name, existingTypeId, description }: UpdateFieldInput,
  ) {
    const field = interfaceType.fieldByKey(targetKey)

    if (!field) {
      throw new Error(`Field with key ${targetKey} not found`)
    }

    if (field.key !== key) {
      interfaceType.validateUniqueFieldKey(key)
    }

    // Reusing updateFromFragment with a made up fragment from the optimistic data
    field.updateFromFragment(
      {
        key,
        name,
        description,
        target: existingTypeId,
        source: interfaceType.id,
      },
      interfaceType.id,
    )

    const input = {
      key,
      name,
      description,
      interfaceTypeId: interfaceType.id,
      targetTypeId: existingTypeId,
      targetKey,
    }

    const res = yield* _await(fieldApi.UpdateField({ input }))

    field.updateFromFragment(res.upsertFieldEdge, interfaceType.id)

    return field
  })

  @modelFlow
  @transaction
  deleteField = _async(function* (
    this: TypeService,
    interfaceType: InterfaceType,
    fieldKey: string,
  ) {
    const field = interfaceType.fieldByKey(fieldKey)

    if (!field) {
      return
    }

    interfaceType.deleteFieldLocal(field)

    const input = { key: fieldKey, interfaceId: interfaceType.id }
    const res = yield* _await(fieldApi.DeleteField({ input }))

    if (res.deleteFieldEdge.deletedEdgesCount === 0) {
      throw new Error(`Failed to delete field with key ${fieldKey}`)
    }

    return field
  })
}
