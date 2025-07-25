import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend-abstract-domain'
import type { IFieldCreateData, IRef } from '@codelab/shared-abstract-core'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import {
  type IFieldCreateRoute,
  type IFieldService,
  type IFieldUpdateRoute,
  IRouteType,
  RoutePaths,
} from '@codelab/frontend-abstract-application'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { fieldRepository } from '@codelab/frontend-domain-type/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { Validator } from '@codelab/shared-infra-typebox'
import { filter, isTruthy, unique } from 'remeda'
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

    await fieldRepository.add(fieldDto, {
      revalidateTags: [CACHE_TAGS.Field.list()],
    })

    return newField
  }

  const create = async (createFieldData: IFieldCreateData) => {
    await typeService.getOne(createFieldData.fieldType)

    const fieldDto = fieldMapper.mapDataToDto(createFieldData)
    const field = fieldDomainService.hydrate(fieldDto)

    const interfaceType = typeDomainService.type<IInterfaceTypeModel>(
      field.api.id,
    )

    interfaceType.writeCache({
      fields: [{ id: field.id }],
    })

    await fieldRepository.add(fieldDto, {
      revalidateTags: [CACHE_TAGS.Field.list()],
    })

    return field
  }

  const removeMany = async (fields: Array<IFieldModel>) => {
    fields.forEach((field) => fieldDomainService.fields.delete(field.id))

    const nodesDeleted = fieldRepository.delete(fields, {
      revalidateTags: [CACHE_TAGS.Field.list()],
    })

    return nodesDeleted
  }

  const moveFieldAsNextSibling = async ({
    field,
    targetFieldId,
  }: Parameters<IFieldService['moveFieldAsNextSibling']>[0]) => {
    const target = fieldDomainService.getField(targetFieldId)

    if (target?.nextSibling?.getRefId() === field.id) {
      return
    }

    const oldConnectedNodeIds = detachFieldFromFieldTree(field.id)

    const newConnectedNodeIds = attachFieldAsNextSibling({
      field,
      targetFieldId,
    })

    await Promise.all(
      unique([...newConnectedNodeIds, ...oldConnectedNodeIds]).map((id) =>
        fieldRepository.updateNodes(getField(id)),
      ),
    )
  }

  const moveFieldAsPrevSibling = async ({
    field,
    targetFieldId,
  }: Parameters<IFieldService['moveFieldAsPrevSibling']>[0]) => {
    const target = fieldDomainService.getField(targetFieldId)

    if (target?.prevSibling?.getRefId() === field.id) {
      return
    }

    const oldConnectedNodeIds = detachFieldFromFieldTree(field.id)

    const newConnectedNodeIds = attachFieldAsPrevSibling({
      field,
      targetFieldId,
    })

    await Promise.all(
      unique([...newConnectedNodeIds, ...oldConnectedNodeIds]).map((id) =>
        fieldRepository.updateNodes(getField(id)),
      ),
    )

    return
  }

  const update = async (updateFieldData: IFieldCreateData) => {
    const field = fieldDomainService.getField(updateFieldData.id)

    Validator.assertsDefined(field)

    const updateFieldDto = fieldMapper.mapDataToDto(updateFieldData)

    field.writeCache(updateFieldDto)

    await fieldRepository.update({ id: updateFieldData.id }, updateFieldDto, {
      revalidateTags: [CACHE_TAGS.Type.list(), CACHE_TAGS.Field.list()],
    })

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
    targetFieldId: existingTargetFieldId,
  }: {
    field: IRef
    targetFieldId: string
  }) => {
    const field = getField(existingField.id)
    const targetField = getField(existingTargetFieldId)
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
    targetFieldId: existingTargetFieldId,
  }: {
    field: IRef
    targetFieldId: string
  }) => {
    const field = getField(existingField.id)
    const targetField = getField(existingTargetFieldId)
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
    { params, searchParams, type }: IFieldUpdateRoute,
  ) => {
    const selectedKey = typeDomainService.selectedKey
    const expandedKeys = typeDomainService.expandedNodes

    if (type === IRouteType.Component) {
      router.push(RoutePaths.Component.builder(params))
    } else if (type === IRouteType.Page) {
      router.push(RoutePaths.Page.builder(params))
    } else {
      router.push(
        RoutePaths.Type.base({ ...searchParams, expandedKeys, selectedKey }),
      )
    }
  }

  const createPopover = {
    close: (router: AppRouterInstance, context: IFieldCreateRoute) => {
      const { params, searchParams, type } = context
      const selectedKey = typeDomainService.selectedKey
      const expandedKeys = typeDomainService.expandedNodes

      if (type === IRouteType.Component) {
        router.push(RoutePaths.Component.builder(params))
      } else if (type === IRouteType.Page) {
        router.push(RoutePaths.Page.builder(params))
      } else {
        router.push(
          RoutePaths.Type.base({ ...searchParams, expandedKeys, selectedKey }),
        )
      }
    },
    open: (router: AppRouterInstance, context: IFieldCreateRoute) => {
      const { params, searchParams, type } = context
      const selectedKey = typeDomainService.selectedKey
      const expandedKeys = typeDomainService.expandedNodes

      if (type === IRouteType.Page) {
        router.push(
          RoutePaths.Page.builderField.create({ params, searchParams }),
        )
      } else if (type === IRouteType.Component) {
        router.push(
          RoutePaths.Component.builderField.create({ params, searchParams }),
        )
      } else {
        router.push(
          RoutePaths.Type.field.create({
            params,
            searchParams: { ...searchParams, expandedKeys, selectedKey },
          }),
        )
      }
    },
  }

  const updatePopover = {
    close: closeFieldPopover,
    open: (router: AppRouterInstance, context: IFieldUpdateRoute) => {
      const { params, searchParams, type } = context
      const selectedKey = typeDomainService.selectedKey
      const expandedKeys = typeDomainService.expandedNodes

      if (type === IRouteType.Component) {
        router.push(RoutePaths.Component.builderField.update(context))
      } else if (type === IRouteType.Page) {
        router.push(RoutePaths.Page.builderField.update(context))
      } else {
        router.push(
          RoutePaths.Type.field.update({
            params,
            searchParams: { ...searchParams, expandedKeys, selectedKey },
          }),
        )
      }
    },
  }

  const deletePopover = {
    close: closeFieldPopover,
    open: (router: AppRouterInstance, context: IFieldUpdateRoute) => {
      const { params, searchParams, type } = context
      const selectedKey = typeDomainService.selectedKey
      const expandedKeys = typeDomainService.expandedNodes

      if (type === IRouteType.Component) {
        router.push(
          RoutePaths.Component.builderField.delete({ params, searchParams }),
        )
      } else if (type === IRouteType.Page) {
        router.push(
          RoutePaths.Page.builderField.delete({ params, searchParams }),
        )
      } else {
        router.push(
          RoutePaths.Type.field.delete({
            params,
            searchParams: {
              ...searchParams,
              expandedKeys,
              selectedKey,
            },
          }),
        )
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
