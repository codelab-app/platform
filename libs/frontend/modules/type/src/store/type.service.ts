import { ModalService } from '@codelab/frontend/shared/utils'
import {
  ICreateFieldDTO,
  ICreateTypeDTO,
  ITypeDTO,
  ITypeKind,
  IUpdateFieldDTO,
  IUpdateTypeDTO,
} from '@codelab/shared/abstract/core'
import { entityMapById } from '@codelab/shared/utils'
import { flatMap } from 'lodash'
import { computed } from 'mobx'
import {
  _async,
  _await,
  arraySet,
  createContext,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { createTypeInputFactory } from '../use-cases/types/create-type/create-type.factory'
import { updateTypeInputFactory } from '../use-cases/types/update-type/update-type.factory'
import { fieldApi } from './apis/field.api'
import {
  createTypeApi,
  deleteTypeApi,
  getAllTypes,
  getTypeApi,
  updateTypeApi,
} from './apis/type.api'
import { FieldModalService } from './field.service'
import { AnyType, Field, InterfaceType } from './models'
import { typeFactory } from './type.factory'
import {
  InterfaceTypeModalService,
  TypeModalService,
} from './type-modal.service'

export type WithTypeService = {
  typeService: TypeService
}

// This can be used to access the type store from anywhere inside the mobx-keystone tree
export const typeServiceContext = createContext<TypeService>()

export const getTypeService = (self: object) => {
  const typeService = typeServiceContext.get(self)

  if (!typeService) {
    throw new Error('TypeService is not defined')
  }

  return typeService
}

@model('@codelab/TypeService')
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
  update = _async(function* (this: TypeService, type: IUpdateTypeDTO) {
    const args = {
      where: { id: type.id },
      ...updateTypeInputFactory(type),
    }

    const [updatedType] = yield* _await(updateTypeApi[type.kind](args))

    if (!updatedType) {
      throw new Error('Type was not updated')
    }

    return this.updateCache(updatedType)
  })

  @modelFlow
  @transaction
  getAll = _async(function* (this: TypeService, ids?: Array<string>) {
    const idsToFetch = ids?.filter((id) => !this.types.has(id))
    const types = yield* _await(getAllTypes(idsToFetch))
    const typesMap = entityMapById(types)

    if (!ids) {
      ids = types.map((t) => t.id)
    }

    // remove duplicates
    ids = [...new Set(ids)]

    return ids.map((id) => {
      if (this.types.has(id)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.types.get(id)!
      }

      const typeModel = typeFactory(typesMap.get(id)!)

      this.types.set(id, typeModel)

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

    const all = yield* _await(this.getAll([id]))

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

    const descendantsResponse = yield* _await(
      getTypeApi.GetDescendants({ ids }),
    )

    const allDescendantIds = Object.values(descendantsResponse).reduce(
      (acc, v) => [...acc, ...flatMap(v, (item) => item.descendantTypesIds)],
      [] as Array<string>,
    )

    // remove duplicates
    const allIds = [...new Set([...ids, ...allDescendantIds])]

    return yield* _await(this.getAll(allIds))
  })

  @modelFlow
  @transaction
  getInterfaceAndDescendants = _async(function* (
    this: TypeService,
    id: string,
  ) {
    const [type] = yield* _await(this.getAllWithDescendants([id]))

    if (type.kind !== ITypeKind.InterfaceType) {
      throw new Error('Type is not an interface')
    }

    return type as InterfaceType
  })

  @modelFlow
  @transaction
  create = _async(function* (
    this: TypeService,
    type: ICreateTypeDTO,
    auth0Id: string,
  ) {
    const typeInput = createTypeInputFactory(type, auth0Id)
    const [typeFragment] = yield* _await(createTypeApi[type.kind](typeInput))

    if (!type) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Type was not created')
    }

    const typeModel = typeFactory(typeFragment)

    this.types.set(type.id, typeModel)

    return type
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
      deleteTypeApi[type.kind]({ where: { id } }),
    )

    if (nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Type was not deleted')
    }

    return { nodesDeleted }
  })

  //
  // The field actions are here because if I put them in InterfaceType
  // some kind of circular dependency happens that breaks the actions in weird and unpredictable ways
  //
  @modelFlow
  @transaction
  addField = _async(function* (
    this: TypeService,
    type: InterfaceType,
    data: ICreateFieldDTO,
  ) {
    const input = {
      interfaceId: type.id,
      fieldTypeId: data.fieldType,
      field: {
        description: data.description,
        id: data.id,
        key: data.key,
        name: data.name,
      },
    }

    const res = yield* _await(fieldApi.CreateField(input))

    const field =
      res.updateInterfaceTypes.interfaceTypes[0].fieldsConnection.edges[0]

    const fieldModel = Field.hydrate(field)
    type.fields.set(fieldModel.id, fieldModel)

    return fieldModel
  })

  @modelFlow
  @transaction
  updateField = _async(function* (
    this: TypeService,
    type: InterfaceType,
    targetKey: string,
    data: IUpdateFieldDTO,
  ) {
    const { key, name, description } = data
    const field = type.field(data.id)

    if (!field) {
      throw new Error(`Field with key ${targetKey} not found`)
    }

    const input = {
      interfaceId: type.id,
      fieldTypeId: data.fieldType,
      field: data,
    }

    const res = yield* _await(fieldApi.UpdateField(input))

    const updatedField =
      res.updateInterfaceTypes.interfaceTypes[0].fieldsConnection.edges[0]

    field.updateCache(updatedField, type.id)

    return field
  })

  @modelFlow
  @transaction
  deleteField = _async(function* (
    this: TypeService,
    interfaceType: InterfaceType,
    fieldId: string,
  ) {
    const field = interfaceType.field(fieldId)

    if (!field) {
      return
    }

    const input = { where: { id: fieldId }, interfaceId: interfaceType.id }
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
