import { type IFieldService } from '@codelab/frontend/abstract/application'
import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend/infra/mobx'
import { fieldRepository } from '@codelab/frontend-domain-type/repositories'
import type {
  ICreateFieldData,
  IFieldDto,
  IRef,
} from '@codelab/shared/abstract/core'
import { assertIsDefined } from '@codelab/shared/utils'
import compact from 'lodash/compact'
import isUndefined from 'lodash/isUndefined'
import uniq from 'lodash/uniq'
import { v4 } from 'uuid'
import { useTypeService } from './type.service'

export const useFieldService = () => {
  const { fieldDomainService } = useDomainStore()
  const typeService = useTypeService()

  const cloneField = async (field: IFieldModel, apiId: string) => {
    const fieldDto = {
      ...fieldService.mapFieldToDTO(field),
      api: { id: apiId },
      id: v4(),
    }

    const newField = fieldDomainService.hydrate(fieldDto)
    const interfaceType = typeService.getType(apiId) as IInterfaceTypeModel

    interfaceType.writeCache({
      fields: [{ id: newField.id }],
    })

    await fieldRepository.add(newField)

    return newField
  }

  const deleteField = async (fields: Array<IFieldModel>) => {
    // const input = { where: { id: fieldId }, interfaceId }
    fields.forEach((field) => fieldDomainService.fields.delete(field.id))

    const nodesDeleted = fieldRepository.delete(fields)

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
  }

  const moveFieldAsNextSibling = async ({
    field,
    targetField,
  }: Parameters<IFieldService['moveFieldAsNextSibling']>[0]) => {
    const target = fieldDomainService.getField(targetField.id)

    if (target?.nextSibling?.getRefId() === field.id) {
      return
    }

    const oldConnectedNodeIds = detachFieldFromFieldTree(field.id)

    const newConnectedNodeIds = attachFieldAsNextSibling({
      field,
      targetField,
    })

    await Promise.all(
      uniq([...newConnectedNodeIds, ...oldConnectedNodeIds]).map((id) =>
        fieldRepository.updateNodes(getField(id)),
      ),
    )
  }

  const moveFieldAsPrevSibling = async ({
    field,
    targetField,
  }: Parameters<IFieldService['moveFieldAsPrevSibling']>[0]) => {
    const target = fieldDomainService.getField(targetField.id)

    if (target?.nextSibling?.getRefId() === field.id) {
      return
    }

    const oldConnectedNodeIds = detachFieldFromFieldTree(field.id)

    const newConnectedNodeIds = attachFieldAsPrevSibling({
      field,
      targetField,
    })

    return Promise.all(
      uniq([...newConnectedNodeIds, ...oldConnectedNodeIds]).map((id) =>
        fieldRepository.updateNodes(getField(id)),
      ),
    )
  }

  const update = async (updateFieldData: ICreateFieldData) => {
    const field = fieldDomainService.getField(updateFieldData.id)

    assertIsDefined(field)

    field.writeCache(fieldService.mapDataToDTO(updateFieldData))

    await fieldRepository.update(field)

    return field
  }

  const getField = (id: string) => {
    const element = fieldDomainService.getField(id)

    if (!element) {
      throw new Error('Missing element')
    }

    return element
  }

  const attachFieldAsNextSibling = ({
    field: existingField,
    targetField: existingTargetField,
  }: {
    field: IRef
    targetField: IRef
  }) => {
    const field = getField(existingField.id)
    const targetField = getField(existingTargetField.id)
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

  const attachFieldAsPrevSibling = ({
    field: existingField,
    targetField: existingTargetField,
  }: {
    field: IRef
    targetField: IRef
  }) => {
    const field = getField(existingField.id)
    const targetField = getField(existingTargetField.id)
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

  const detachFieldFromFieldTree = (fieldId: string) => {
    const field = getField(fieldId)
    const affectedNodeIds = [field.prevSibling?.id, field.nextSibling?.id]

    field.connectPrevToNextSibling()

    return compact(affectedNodeIds)
  }

  return {}
}

export const fieldService = {
  mapDataToDTO: (fieldData: ICreateFieldData) => {
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
  },

  mapFieldToDTO: (field: IFieldModel): IFieldDto => {
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
  },
}
