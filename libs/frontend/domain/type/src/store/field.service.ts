import type {
  ICreateFieldData,
  IField,
  IFieldService,
  IInterfaceType,
} from '@codelab/frontend/abstract/core'
import { getElementService } from '@codelab/frontend/abstract/core'
import type { FieldFragment } from '@codelab/shared/abstract/codegen'
import { IFieldDTO } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import compact from 'lodash/compact'
import uniq from 'lodash/uniq'
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
import { FieldRepository } from '../services/field.repo'
import {
  CreateFieldModalService,
  FieldModalService,
} from './field-modal.service'
import { Field } from './models'
import { getTypeService } from './type.service.context'

@model('@codelab/FieldService')
export class FieldService
  extends Model({
    createModal: prop(() => new CreateFieldModalService({})),
    deleteModal: prop(() => new FieldModalService({})),
    fieldRepository: prop(() => new FieldRepository({})),
    fields: prop(() => objectMap<IField>()),
    id: idProp,
    updateModal: prop(() => new FieldModalService({})),
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

  @modelAction
  field(id: string) {
    const element = this.getField(id)

    if (!element) {
      throw new Error('Missing element')
    }

    return element
  }

  // The field actions are here because if I put them in InterfaceType
  // some kind of circular dependency happens that breaks the actions in weird and unpredictable ways
  @modelFlow
  @transaction
  create = _async(function* (
    this: FieldService,
    createFieldData: ICreateFieldData,
  ) {
    // Need to load the field type if its not loaded yet
    if (!this.typeService.types.has(createFieldData.fieldType)) {
      yield* _await(this.typeService.getOne(createFieldData.fieldType))
    }

    const field = this.add(FieldService.mapDataToDTO(createFieldData))
    const interfaceType = this.typeService.type(field.api.id) as IInterfaceType

    interfaceType.writeCache({
      fields: [{ id: field.id }],
    })

    yield* _await(this.fieldRepository.add(field))

    return field
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: FieldService,
    updateFieldData: ICreateFieldData,
  ) {
    const field = this.getField(updateFieldData.id)!

    field.writeCache(FieldService.mapDataToDTO(updateFieldData))

    yield* _await(this.fieldRepository.update(field))

    return field
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: FieldService, fields: Array<IField>) {
    // const input = { where: { id: fieldId }, interfaceId }
    fields.forEach((field) => this.fields.delete(field.id))

    const nodesDeleted = yield* _await(this.fieldRepository.delete(fields))

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
    const loadedFields = fields.map((fragment) => Field.create(fragment))

    for (const field of loadedFields) {
      this.fields.set(field.id, field)
    }

    return loadedFields
  }

  @modelAction
  add(fieldDTO: IFieldDTO) {
    const existingField = this.fields.get(fieldDTO.id)

    if (existingField) {
      return existingField
    }

    const field = Field.create(fieldDTO)

    this.fields.set(field.id, field)

    return field
  }

  @modelAction
  private attachFieldAsNextSibling(
    this: FieldService,
    {
      field: existingField,
      targetField: existingTargetField,
    }: {
      field: IEntity
      targetField: IEntity
    },
  ) {
    const field = this.field(existingField.id)
    const targetField = this.field(existingTargetField.id)
    const affectedNodeIds: Array<string> = []

    if (targetField.nextSibling) {
      field.attachAsPrevSibling(targetField.nextSibling.current)
      affectedNodeIds.push(targetField.nextSibling.current.id)
    }

    field.attachAsNextSibling(targetField)
    affectedNodeIds.push(targetField.id)
    affectedNodeIds.push(field.id)

    return affectedNodeIds
  }

  @modelAction
  private attachFieldAsPrevSibling(
    this: FieldService,
    {
      field: existingField,
      targetField: existingTargetField,
    }: {
      field: IEntity
      targetField: IEntity
    },
  ) {
    const field = this.field(existingField.id)
    const targetField = this.field(existingTargetField.id)
    const affectedNodeIds: Array<string> = []

    if (targetField.prevSibling) {
      field.attachAsNextSibling(targetField.prevSibling.current)
      affectedNodeIds.push(targetField.prevSibling.current.id)
    }

    field.attachAsPrevSibling(targetField)
    affectedNodeIds.push(targetField.id)
    affectedNodeIds.push(field.id)

    return affectedNodeIds
  }

  @modelAction
  private detachFieldFromFieldTree(this: FieldService, fieldId: string) {
    const field = this.field(fieldId)
    const affectedNodeIds = [field.prevSibling?.id, field.nextSibling?.id]

    field.connectPrevToNextSibling()

    return compact(affectedNodeIds)
  }

  @modelFlow
  @transaction
  moveFieldAsNextSibling = _async(function* (
    this: FieldService,
    {
      field,
      targetField,
    }: Parameters<IFieldService['moveFieldAsNextSibling']>[0],
  ) {
    const target = this.getField(targetField.id)

    if (target?.nextSibling?.getRefId() === field.id) {
      return
    }

    const oldConnectedNodeIds = this.detachFieldFromFieldTree(field.id)

    const newConnectedNodeIds = this.attachFieldAsNextSibling({
      field,
      targetField,
    })

    yield* _await(
      Promise.all(
        uniq([...newConnectedNodeIds, ...oldConnectedNodeIds]).map((id) =>
          this.fieldRepository.updateNodes(this.field(id)),
        ),
      ),
    )
  })

  @modelFlow
  @transaction
  moveFieldAsPrevSibling = _async(function* (
    this: FieldService,
    {
      field,
      targetField,
    }: Parameters<IFieldService['moveFieldAsPrevSibling']>[0],
  ) {
    const target = this.getField(targetField.id)

    if (target?.nextSibling?.getRefId() === field.id) {
      return
    }

    const oldConnectedNodeIds = this.detachFieldFromFieldTree(field.id)

    const newConnectedNodeIds = this.attachFieldAsPrevSibling({
      field,
      targetField,
    })

    yield* _await(
      Promise.all(
        uniq([...newConnectedNodeIds, ...oldConnectedNodeIds]).map((id) =>
          this.fieldRepository.updateNodes(this.field(id)),
        ),
      ),
    )
  })

  private static mapDataToDTO(fieldData: ICreateFieldData) {
    return {
      ...fieldData,
      api: { id: fieldData.interfaceTypeId },
      defaultValues: fieldData.defaultValues
        ? JSON.stringify(fieldData.defaultValues)
        : null,
      fieldType: { id: fieldData.fieldType },
      validationRules: fieldData.validationRules
        ? JSON.stringify(fieldData.validationRules)
        : null,
    }
  }
}
