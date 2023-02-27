import type {
  ICreateFieldDTO,
  IField,
  IFieldService,
  IInterfaceType,
} from '@codelab/frontend/abstract/core'
import { IFieldDTO } from '@codelab/frontend/abstract/core'
import { getElementService } from '@codelab/frontend/presenter/container'
import type {
  FieldCreateInput,
  FieldFragment,
  FieldUpdateInput,
} from '@codelab/shared/abstract/codegen'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
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
import {
  CreateFieldModalService,
  FieldModalService,
} from './field-modal.service'
import { Field } from './models'
import { getTypeService } from './type.service.context'

@model('@codelab/FieldService')
export class FieldService
  extends Model({
    id: idProp,
    fields: prop(() => objectMap<IField>()),
    createModal: prop(() => new CreateFieldModalService({})),
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

  getField(id: string) {
    return this.fields.get(id)
  }

  // The field actions are here because if I put them in InterfaceType
  // some kind of circular dependency happens that breaks the actions in weird and unpredictable ways
  @modelFlow
  @transaction
  createSubmit = _async(function* (
    this: FieldService,
    data: Array<ICreateFieldDTO>,
  ) {
    const input: Array<FieldCreateInput> = data.map((field) => ({
      description: field.description,
      id: field.id,
      key: field.key,
      name: field.name,
      defaultValues: JSON.stringify(field.defaultValues),
      validationRules: JSON.stringify(field.validationRules),
      fieldType: connectNodeId(field.fieldType),
      api: connectNodeId(field.interfaceTypeId),
    }))

    const {
      createFields: { fields },
    } = yield* _await(fieldApi.CreateFields({ input }))

    for (const { interfaceTypeId } of data) {
      const interfaceType = this.typeService.type(
        interfaceTypeId,
      ) as IInterfaceType

      interfaceType.writeFieldCache(fields)
    }

    return fields.map((field) => this.add(field))
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: FieldService,
    {
      fieldType,
      description,
      id,
      key,
      name,
      defaultValues,
      validationRules,
    }: ICreateFieldDTO,
  ) {
    const {
      updateFields: { fields },
    } = yield* _await(
      fieldApi.UpdateFields({
        where: {
          id,
        },
        update: {
          fieldType: reconnectNodeId(fieldType),
          description: description,
          id: id,
          key: key,
          name: name,
          defaultValues: JSON.stringify(defaultValues),
          validationRules: JSON.stringify(validationRules),
        },
      }),
    )

    return fields.map((field) => this.add(field))
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: FieldService, ids: Array<string>) {
    // const input = { where: { id: fieldId }, interfaceId }
    ids.forEach((id) => this.fields.delete(id))

    const {
      deleteFields: { nodesDeleted },
    } = yield* _await(
      fieldApi.DeleteFields({
        where: {
          id_IN: ids,
        },
      }),
    )

    return nodesDeleted

    //     interfaceType,
    // yield* _await(this.updateDefaults(interfaceId, null, field.key))

    // Returns current edges, not deleted edges
    // const deletedField =
    //   res.updateInterfaceTypes.interfaceTypes[0].fieldsConnection.edges[0]
    //
    // if (!deletedField) {
    //   throw new Error(`Failed to delete field with id ${fieldId}`)
    // }

    // interfaceType.deleteFieldLocal(field)
  })

  @modelAction
  load(fields: Array<FieldFragment>) {
    const hydratedFields = fields.map((fragment) => Field.hydrate(fragment))

    this.fields = objectMap(hydratedFields.map((field) => [field.id, field]))
  }

  @modelAction
  add(fragment: IFieldDTO) {
    let fieldModel = this.fields.get(fragment.id)

    if (fieldModel) {
      fieldModel.add(fragment)
    } else {
      fieldModel = Field.hydrate(fragment)
      this.fields.set(fragment.id, fieldModel)
    }

    return fieldModel
  }
}
