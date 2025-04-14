import type {
  ITreeNode,
  ITypeTreeNodeData,
} from '@codelab/frontend/abstract/domain'
import type { SearchParamsClientProps } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import type { SyntheticEvent } from 'react'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { IRouteType } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { useRouter } from 'next/navigation'

import { useFieldService } from '../../services/field.service'
import { useTypeService } from '../../services/type.service'

interface TypesTreeItemProps {
  data: ITreeNode<ITypeTreeNodeData>
  searchParams: SearchParamsClientProps
}

export const TypesTreeItem = ({ data, searchParams }: TypesTreeItemProps) => {
  const { fieldDomainService } = useDomainStore()
  const typeService = useTypeService()
  const fieldService = useFieldService()
  const router = useRouter()

  const deleteNode = () => {
    if (data.extraData.type === 'type') {
      void typeService.deleteType(data.extraData.node)
    } else {
      void fieldService.removeMany([data.extraData.node])
    }
  }

  const onEdit = () => {
    if (data.extraData.type === 'type') {
      typeService.updatePopover.open(router, {
        params: { typeId: data.extraData.node.id },
        searchParams,
      })
    } else {
      fieldService.updatePopover.open(router, {
        params: { fieldId: data.extraData.node.id },
        searchParams,
        type: IRouteType.Type,
      })
    }
  }

  const onAddField = (event: SyntheticEvent) => {
    // Prevent triggering `onEdit`
    event.stopPropagation()

    if (
      data.extraData.type === 'type' &&
      data.extraData.node.kind !== ITypeKind.InterfaceType
    ) {
      return
    }

    if (
      data.extraData.type === 'field' &&
      data.extraData.node.type.current.kind !== ITypeKind.InterfaceType
    ) {
      return
    }

    const interfaceType =
      data.extraData.type === 'field'
        ? data.extraData.node.type.current
        : data.extraData.node

    fieldService.createPopover.open(router, {
      params: { interfaceId: interfaceType.id },
      searchParams,
      type: IRouteType.Type,
    })
  }

  const toolbarItems: Array<ToolbarItem> = [
    {
      confirmText: `Are you sure you want to delete "${data.title}"?`,
      cuiKey:
        data.extraData.type === 'type'
          ? UiKey.TypeToolbarItemDelete
          : UiKey.FieldToolbarItemDelete,
      icon: <DeleteOutlined />,
      onClick: (event: SyntheticEvent) => {
        // Prevent triggering `onEdit`
        event.stopPropagation()

        deleteNode()
      },
      title: data.extraData.type === 'type' ? 'Delete type' : 'Delete field',
    },
  ]

  if (
    (data.extraData.type === 'field' &&
      fieldDomainService.getField(data.extraData.node.id)?.type.maybeCurrent
        ?.kind === ITypeKind.InterfaceType) ||
    (data.extraData.type === 'type' &&
      data.extraData.node.kind === ITypeKind.InterfaceType)
  ) {
    toolbarItems.push({
      cuiKey: UiKey.FieldToolbarItemCreate,
      icon: <PlusOutlined />,
      onClick: (event: SyntheticEvent) => onAddField(event),
      title: 'Add field',
    })
  }

  return (
    <CuiTreeItem
      highlight={data.highlight}
      key={data.key}
      onClick={(event) => onEdit()}
      primaryTitle={data.primaryTitle}
      secondaryTitle={data.secondaryTitle}
      selectedKey={data.key}
      toolbar={
        <CuiTreeItemToolbar
          items={toolbarItems}
          title="State Tree Item toolbar"
        />
      }
    />
  )
}
