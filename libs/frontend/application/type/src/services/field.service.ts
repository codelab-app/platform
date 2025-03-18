import type {
  IFieldCreateRouteContext,
  IFieldRouteContext,
  IFieldService,
  IFieldUpdateRouteContext,
} from '@codelab/frontend/abstract/application'
import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import type {
  BuilderContextParams,
  IBuilderRouteContext,
} from '@codelab/frontend/abstract/types'
import type {
  ICreateFieldData,
  IFieldDto,
  IRef,
} from '@codelab/shared/abstract/core'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import {
  IRouteType,
  PageType,
  PrimarySidebar,
} from '@codelab/frontend/abstract/types'
import { fieldRepository } from '@codelab/frontend-domain-type/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Validator } from '@codelab/shared/infra/typebox'
import { filter, isDefined, isTruthy, unique } from 'remeda'
import { v4 } from 'uuid'

import { fieldMapper } from './field.mapper'
import { useTypeService } from './type.service'

export const useFieldService = (): IFieldService => {
  const { fieldDomainService, typeDomainService } = useDomainStore()
  const typeService = useTypeService()

  const cloneField = async (field: IFieldModel, apiId: string) => {
    const fieldDto = {
      ...fieldMapper.mapFieldToDto(field),
      api: { id: apiId },
      id: v4(),
    }

    const newField = fieldDomainService.hydrate(fieldDto)
    const interfaceType = typeDomainService.type<IInterfaceTypeModel>(apiId)

    interfaceType.writeCache({
      fields: [{ id: newField.id }],
    })

    await fieldRepository.add(fieldDto)

    return newField
  }

  const create = async (createFieldData: ICreateFieldData) => {
    await typeService.getOne(createFieldData.fieldType)

    const fieldDto = fieldMapper.mapDataToDto(createFieldData)
    const field = fieldDomainService.hydrate(fieldDto)

    const interfaceType = typeDomainService.type<IInterfaceTypeModel>(
      field.api.id,
    )

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

    const updateFieldDto = fieldMapper.mapDataToDto(updateFieldData)

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

  const closeFieldPopover = (
    router: AppRouterInstance,
    { params, type }: IFieldRouteContext,
  ) => {
    if (type === IRouteType.Component) {
      router.push(PageType.ComponentBuilder(params))
    } else if (type === IRouteType.Page) {
      router.push(PageType.PageBuilder(params, PrimarySidebar.ElementTree))
    } else {
      router.push(PageType.Type())
    }
  }

  const createPopover = {
    close: closeFieldPopover,
    open: (
      router: AppRouterInstance,
      { params, type }: IFieldCreateRouteContext,
    ) => {
      if (type === IRouteType.Page) {
        router.push(
          PageType.PageBuilderCreateField(params, PrimarySidebar.ElementTree),
        )
      } else if (type === IRouteType.Component) {
        router.push(PageType.ComponentBuilderCreateField(params))
      }
    },
  }

  const updatePopover = {
    close: closeFieldPopover,
    open: (
      router: AppRouterInstance,
      { params, type }: IFieldUpdateRouteContext,
    ) => {
      if (type === IRouteType.Component) {
        router.push(PageType.ComponentBuilderUpdateField(params))
      } else if (type === IRouteType.Page) {
        router.push(PageType.PageBuilderUpdateField(params))
      } else {
        router.push(PageType.TypeUpdateField(params))
      }
    },
  }

  const deletePopover = {
    close: closeFieldPopover,
    open: (
      router: AppRouterInstance,
      { params, type }: IFieldUpdateRouteContext,
    ) => {
      if (type === IRouteType.Component) {
        router.push(PageType.ComponentBuilderDeleteField(params))
      } else if (type === IRouteType.Page) {
        router.push(PageType.PageBuilderDeleteField(params))
      } else {
        router.push(PageType.TypeDeleteField(params))
      }
    },
  }

  return {
    cloneField,
    create,
    createPopover,
    deletePopover,
    moveFieldAsNextSibling,
    moveFieldAsPrevSibling,
    removeMany,
    update,
    updatePopover,
  }
}
