import type {
  ITreeNode,
  ITypeTreeNodeData,
} from '@codelab/frontend/abstract/domain'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import type { SyntheticEvent } from 'react'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { PageType } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { useRouter } from 'next/navigation'

interface TypesTreeItemProps {
  data: ITreeNode<ITypeTreeNodeData>
}

export const TypesTreeItem = ({ data }: TypesTreeItemProps) => {
  const { fieldDomainService } = useDomainStore()
  const router = useRouter()

  const onEdit = () => {
    if (data.extraData.type === 'type') {
      router.push(PageType.TypeUpdate(data.extraData.node))
    } else {
      router.push(PageType.TypeFieldUpdate({ fieldId: data.extraData.node.id }))
    }
  }

  const onDelete = (event: SyntheticEvent) => {
    // Prevent triggering `onEdit`
    event.stopPropagation()

    if (data.extraData.type === 'type') {
      router.push(PageType.TypeDelete(data.extraData.node))
    } else {
      router.push(PageType.TypeFieldDelete({ fieldId: data.extraData.node.id }))
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

    router.push(PageType.TypeFieldCreate(interfaceType.id))
  }

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey:
        data.extraData.type === 'type'
          ? UiKey.TypeToolbarItemDelete
          : UiKey.FieldToolbarItemDelete,
      icon: <DeleteOutlined />,
      onClick: onDelete,
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
      onClick: onAddField,
      title: 'Add field',
    })
  }

  return (
    <CuiTreeItem
      highlight={data.highlight}
      key={data.key}
      onClick={onEdit}
      primaryTitle={data.primaryTitle}
      secondaryTitle={data.secondaryTitle}
      toolbar={
        <CuiTreeItemToolbar
          items={toolbarItems}
          title="State Tree Item toolbar"
        />
      }
    />
  )
}
