import type {
  IFieldService,
  UpdatePopoverParamsContext,
} from '@codelab/frontend/abstract/application'
import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import type {
  ComponentContextParams,
  PageContextParams,
} from '@codelab/frontend/abstract/types'
import type {
  ICreateFieldData,
  IFieldDto,
  IRef,
} from '@codelab/shared/abstract/core'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { PageType, PrimarySidebar } from '@codelab/frontend/abstract/types'
import { fieldRepository } from '@codelab/frontend-domain-type/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Validator } from '@codelab/shared/infra/validation'
import { filter, isDefined, isTruthy, unique } from 'remeda'
import { v4 } from 'uuid'

import { useTypeService } from './type.service'

export const useFieldService = (): IFieldService => {
  const { fieldDomainService, typeDomainService } = useDomainStore()
  const typeService = useTypeService()

  const cloneField = async (field: IFieldModel, apiId: string) => {
    const fieldDto = {
      ...fieldService.mapFieldToDto(field),
      api: { id: apiId },
      id: v4(),
    }

    const newField = fieldDomainService.hydrate(fieldDto)

    const interfaceType = typeDomainService.getType(
      apiId,
    ) as IInterfaceTypeModel

    interfaceType.writeCache({
      fields: [{ id: newField.id }],
    })

    await fieldRepository.add(fieldDto)

    return newField
  }

  const create = async (createFieldData: ICreateFieldData) => {
    await typeService.getOne(createFieldData.fieldType)

    const fieldDto = fieldService.mapDataToDto(createFieldData)
    const field = fieldDomainService.hydrate(fieldDto)

    const interfaceType = typeDomainService.getType(
      field.api.id,
    ) as IInterfaceTypeModel

    interfaceType.writeCache({
      fields: [{ id: field.id }],
    })

    await fieldRepository.add(fieldDto)

    return field
  }

  const removeMany = async (fields: Array<IFieldModel>) => {
    fields.forEach((field) => fieldDomainService.fields.delete(field.id))

    const nodesDeleted = fieldRepository.delete(fields)

    return nodesDeleted
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
      unique([...newConnectedNodeIds, ...oldConnectedNodeIds]).map((id) =>
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

    await Promise.all(
      unique([...newConnectedNodeIds, ...oldConnectedNodeIds]).map((id) =>
        fieldRepository.updateNodes(getField(id)),
      ),
    )

    return
  }

  const update = async (updateFieldData: ICreateFieldData) => {
    const field = fieldDomainService.getField(updateFieldData.id)

    Validator.assertsDefined(field)

    const updateFieldDto = fieldService.mapDataToDto(updateFieldData)

    field.writeCache(updateFieldDto)

    await fieldRepository.update({ id: updateFieldData.id }, updateFieldDto)

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

    return filter(affectedNodeIds, isTruthy)
  }

  const getOneFromCache = (ref: IRef) => {
    return fieldDomainService.fields.get(ref.id)
  }

  const createPopover = {
    close: (router: AppRouterInstance) => {
      router.back()
    },
    open: (
      router: AppRouterInstance,
      {
        appId,
        componentId,
        pageId,
      }: PageContextParams & ComponentContextParams,
    ) => {
      const url =
        appId && pageId
          ? PageType.PageBuilder({ appId, pageId }, PrimarySidebar.ElementTree)
          : PageType.ComponentBuilder({ componentId })

      router.push(`${url}/create-field`)
    },
  }

  const updatePopover = {
    close: (router: AppRouterInstance) => {
      router.back()
    },
    open: (
      router: AppRouterInstance,
      { appId, componentId, fieldId, pageId }: UpdatePopoverParamsContext,
    ) => {
      const url =
        appId && pageId
          ? PageType.PageBuilder({ appId, pageId }, PrimarySidebar.ElementTree)
          : PageType.ComponentBuilder({ componentId })

      router.push(`${url}/update-field/${fieldId}`)
    },
  }

  const deletePopover = {
    close: (router: AppRouterInstance) => {
      router.back()
    },
    open: (
      router: AppRouterInstance,
      { appId, componentId, fieldId, pageId }: UpdatePopoverParamsContext,
    ) => {
      const url =
        appId && pageId
          ? PageType.PageBuilder({ appId, pageId }, PrimarySidebar.ElementTree)
          : PageType.ComponentBuilder({ componentId })

      router.push(`${url}/delete/field/${fieldId}`)
    },
  }

  return {
    cloneField,
    create,
    createPopover,
    deletePopover,
    getOneFromCache,
    moveFieldAsNextSibling,
    moveFieldAsPrevSibling,
    removeMany,
    update,
    updatePopover,
  }
}

export const fieldService = {
  mapDataToDto: (fieldData: ICreateFieldData) => {
    return {
      ...fieldData,
      api: { id: fieldData.interfaceTypeId },
      defaultValues: isDefined(fieldData.defaultValues)
        ? JSON.stringify(fieldData.defaultValues)
        : null,
      fieldType: { id: fieldData.fieldType },
      validationRules: fieldData.validationRules
        ? JSON.stringify(fieldData.validationRules)
        : null,
    }
  },

  mapFieldToDto: (field: IFieldModel): IFieldDto => {
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
