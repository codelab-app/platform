import { ModalService } from '@codelab/frontend/shared/utils'
import {
  IAnyType,
  ICreateFieldDTO,
  IUpdateFieldDTO,
  TypeKind,
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
import { TypeFragment } from '../graphql'
import { fieldApi } from './apis/field.api'
import {
  createTypeApi,
  deleteTypeApi,
  getAllTypes,
  getTypeApi,
  updateTypeApi,
} from './apis/type.api'
import { FieldModalService } from './field.service'
import { InterfaceType } from './models'
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

export const getTypeService = (thisModel: object) => {
  const typeService = typeServiceContext.get(thisModel)

  if (!typeService) {
    throw new Error('TypeService is not defined')
  }

  return typeService
}

@model('codelab/TypeService')
export class TypeService extends Model({
  types: prop(() => objectMap<IAnyType>()),

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
  addTypeLocal(type: IAnyType) {
    this.types.set(type.id, type)
  }

  @modelAction
  addOrUpdateLocal(fragment: TypeFragment) {
    let typeModel = this.types.get(fragment.id)

    if (typeModel) {
      typeModel.updateFromFragment(fragment)
    } else {
      typeModel = typeFactory(fragment)
      this.types.set(fragment.id, typeModel)
    }

    return typeModel
  }

  @modelFlow
  @transaction
  update = _async(function* (this: TypeService, type: IAnyType) {
    const [updatedType] = yield* _await(
      updateTypeApi[type.typeKind]({
        where: { id: type.id },
        ...type.makeUpdateInput(),
      }),
    )

    if (!updatedType) {
      throw new Error('Type was not updated')
    }

    return this.addOrUpdateLocal(updatedType)
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
    const [intface] = yield* _await(this.getAllWithDescendants([id]))

    if (intface.typeKind !== TypeKind.InterfaceType) {
      throw new Error('Type is not an interface')
    }

    return intface as InterfaceType
  })

  @modelFlow
  @transaction
  create = _async(function* (this: TypeService, type: IAnyType) {
    const [typeFragment] = yield* _await(
      createTypeApi[type.typeKind](type.makeCreateInput(type.ownerAuth0Id)),
    )

    if (!type) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Type was not created')
    }

    type.updateFromFragment(typeFragment)

    this.types.set(type.id, type)

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
    data: ICreateFieldDTO,
  ) {
    const { existingTypeId, name, description, key } = data

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
    { key, name, existingTypeId, description }: IUpdateFieldDTO,
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
