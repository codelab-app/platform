import type {
  ICreateFieldDTO,
  IField,
  IFieldDTO,
  IFieldRef,
  IInterfaceTypeRef,
} from '@codelab/frontend/abstract/core'
import { IFieldService } from '@codelab/frontend/abstract/core'
import { getElementService } from '@codelab/frontend/presenter/container'
import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import mapKeys from 'lodash/mapKeys'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import { computed } from 'mobx'
import {
  _async,
  _await,
  idProp,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { fieldApi } from './apis/field.api'
import { FieldModalService } from './field-modal.service'
import { Field } from './models'
import { getTypeService } from './type.service.context'
import { InterfaceTypeModalService } from './type-modal.service'

@model('@codelab/FieldService')
export class FieldService
  extends Model({
    id: idProp,
    fields: prop(() => objectMap<IField>()),
    createModal: prop(() => new InterfaceTypeModalService({})),
    updateModal: prop(() => new FieldModalService({})),
    deleteModal: prop(() => new FieldModalService({})),
  })
  implements IFieldService
{
  @computed
  get elementService() {
    return getElementService(this)
  }

  @computed
  get typeService() {
    return getTypeService(this)
  }

  //
  // The field actions are here because if I put them in InterfaceType
  // some kind of circular dependency happens that breaks the actions in weird and unpredictable ways
  //
  @modelFlow
  @transaction
  upsert = _async(function* (this: FieldService, data: ICreateFieldDTO) {
    const {
      interfaceTypeId,
      fieldType,
      description,
      id,
      key,
      name,
      validationRules,
    } = data

    const input = {
      interfaceTypeId,
      fieldTypeId: fieldType,
      field: {
        description: description,
        id,
        key,
        name,
        validationRules: JSON.stringify(validationRules),
      },
    }

    const { upsertField } = yield* _await(fieldApi.UpsertField(input))

    const interfaceType = yield* _await(
      this.updateDefaults(interfaceTypeId, key, null),
    )

    return this.writeCache(upsertField)
  })

  @modelFlow
  @transaction
  delete = _async(function* (
    this: FieldService,
    interfaceId: IInterfaceTypeRef,
    fieldId: IFieldRef,
  ) {
    const interfaceType = throwIfUndefined(this.typeService.type(interfaceId))

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

  @modelAction
  writeCache(fragment: IFieldDTO) {
    let fieldModel = this.fields.get(fragment.id)

    if (fieldModel) {
      fieldModel.writeCache(fragment)
    } else {
      fieldModel = Field.hydrate(fragment)
      this.fields.set(fragment.id, fieldModel)
    }

    return fieldModel
  }

  @modelFlow
  @transaction
  private updateDefaults = _async(function* (
    this: FieldService,
    interfaceId: string,
    addedKey: Nullable<string>,
    removedKey: Nullable<string>,
  ): Generator {
    const interfaceType = throwIfUndefined(this.typeService.type(interfaceId))
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

    yield* _await(this.typeService.update(interfaceType, updateInput))

    return interfaceType
  })
}
