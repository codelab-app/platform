import type {
  ICreateFieldData,
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
  create = _async(function* (
    this: FieldService,
    {
      description,
      id,
      key,
      name,
      defaultValues,
      fieldType,
      validationRules,
      interfaceTypeId,
    }: ICreateFieldData,
  ) {
    const {
      createFields: {
        fields: [field],
      },
    } = yield* _await(
      fieldApi.CreateFields({
        input: {
          description,
          id,
          key,
          name,
          defaultValues: JSON.stringify(defaultValues),
          validationRules: JSON.stringify(validationRules),
          fieldType: connectNodeId(fieldType),
          api: connectNodeId(interfaceTypeId),
        },
      }),
    )

    const interfaceType = this.typeService.type(
      interfaceTypeId,
    ) as IInterfaceType

    interfaceType.writeFieldCache([field!])

    return this.add(field!)
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
    }: ICreateFieldData,
  ) {
    const {
      updateFields: {
        fields: [field],
      },
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

    return this.add(field!)
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
    const hydratedFields = fields.map((fragment) => Field.create(fragment))

    this.fields = objectMap(hydratedFields.map((field) => [field.id, field]))
  }

  @modelAction
  add(fieldDTO: IFieldDTO) {
    const field = Field.create(fieldDTO)

    this.fields.set(field.id, field)

    return field
  }
}
