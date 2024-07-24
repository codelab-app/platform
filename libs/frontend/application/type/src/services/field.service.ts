import {
  getElementService,
  type IFieldService,
} from '@codelab/frontend/abstract/application'
import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import { FieldDomainService } from '@codelab/frontend-domain-type/services'
import type {
  ICreateFieldData,
  IFieldDto,
  IRef,
} from '@codelab/shared/abstract/core'
import { assertIsDefined } from '@codelab/shared/utils'
import compact from 'lodash/compact'
import isUndefined from 'lodash/isUndefined'
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
  prop,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { FieldRepository } from '../../../../domain/type/src/repositories/field.repo'
import { CreateFieldFormService, FieldFormService } from './field-form.service'
import {
  CreateFieldModalService,
  FieldModalService,
} from './field-modal.service'
import { getTypeService } from './type.service.context'

@model('@codelab/FieldService')
export class FieldService
  extends Model({
    createForm: prop(() => new CreateFieldFormService({})),
    createModal: prop(() => new CreateFieldModalService({})),
    deleteModal: prop(() => new FieldModalService({})),
    fieldDomainService: prop(() => new FieldDomainService({})),
    fieldRepository: prop(() => new FieldRepository({})),
    id: idProp,
    updateForm: prop(() => new FieldFormService({})),
    updateModal: prop(() => new FieldModalService({})),
  })
  implements IFieldService
{
  @modelFlow
  @transaction
  cloneField = _async(function* (
    this: FieldService,
    field: IFieldModel,
    apiId: string,
  ) {
    const fieldDto = {
      ...FieldService.mapFieldToDTO(field),
      api: { id: apiId },
      id: v4(),
    }

    const newField = this.fieldDomainService.hydrate(fieldDto)
    const interfaceType = this.typeService.type(apiId) as IInterfaceTypeModel

    interfaceType.writeCache({
      fields: [{ id: newField.id }],
    })

    yield* _await(this.fieldRepository.add(newField))

    return newField
  })

  // The field actions are here because if I put them in InterfaceType
  // some kind of circular dependency happens that breaks the actions in weird and unpredictable ways
  @modelFlow
  @transaction
  create = _async(function* (
    this: FieldService,
    createFieldData: ICreateFieldData,
  ) {
    // Need to load the field type if its not loaded yet
    if (
      !this.typeService.typeDomainService.types.has(createFieldData.fieldType)
    ) {
      yield* _await(this.typeService.getOne(createFieldData.fieldType))
    }

    const field = this.fieldDomainService.hydrate(
      FieldService.mapDataToDTO(createFieldData),
    )

    const interfaceType = this.typeService.type(
      field.api.id,
    ) as IInterfaceTypeModel

    interfaceType.writeCache({
      fields: [{ id: field.id }],
    })

    yield* _await(this.fieldRepository.add(field))

    return field
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: FieldService, fields: Array<IFieldModel>) {
    // const input = { where: { id: fieldId }, interfaceId }
    fields.forEach((field) => this.fieldDomainService.fields.delete(field.id))

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

  @modelFlow
  @transaction
  moveFieldAsNextSibling = _async(function* (
    this: FieldService,
    {
      field,
      targetField,
    }: Parameters<IFieldService['moveFieldAsNextSibling']>[0],
  ) {
    const target = this.fieldDomainService.getField(targetField.id)

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
    const target = this.fieldDomainService.getField(targetField.id)

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

  @modelFlow
  @transaction
  update = _async(function* (
    this: FieldService,
    updateFieldData: ICreateFieldData,
  ) {
    const field = this.fieldDomainService.getField(updateFieldData.id)

    assertIsDefined(field)

    field.writeCache(FieldService.mapDataToDTO(updateFieldData))

    yield* _await(this.fieldRepository.update(field))

    return field
  })

  @modelAction
  field(id: string) {
    const element = this.fieldDomainService.getField(id)

    if (!element) {
      throw new Error('Missing element')
    }

    return element
  }

  private static mapDataToDTO(fieldData: ICreateFieldData) {
    return {
      ...fieldData,
      api: { id: fieldData.interfaceTypeId },
      defaultValues: !isUndefined(fieldData.defaultValues)
        ? JSON.stringify(fieldData.defaultValues)
        : null,
      fieldType: { id: fieldData.fieldType },
      validationRules: fieldData.validationRules
        ? JSON.stringify(fieldData.validationRules)
        : null,
    }
  }

  private static mapFieldToDTO(field: IFieldModel): IFieldDto {
    return {
      api: { id: field.api.id },
      defaultValues: field.defaultValues
        ? JSON.stringify(field.defaultValues)
        : null,
      description: field.description,
      fieldType: { id: field.type.id },
      id: field.id,
      key: field.key,
      name: field.name,
      validationRules: field.validationRules
        ? JSON.stringify(field.validationRules)
        : null,
    }
  }

  @modelAction
  private attachFieldAsNextSibling(
    this: FieldService,
    {
      field: existingField,
      targetField: existingTargetField,
    }: {
      field: IRef
      targetField: IRef
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
      field: IRef
      targetField: IRef
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

  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }
}
