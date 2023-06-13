import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type {
  IInterfaceType,
  IStateTreeDataNode,
} from '@codelab/frontend/abstract/core'
import { fieldRef, typeRef } from '@codelab/frontend/abstract/core'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import type { Ref } from 'mobx-keystone'
import React from 'react'

interface StateTreeItemProps {
  data: IStateTreeDataNode
}

export const StateTreeItem = ({ data }: StateTreeItemProps) => {
  const { fieldService } = useStore()

  const onEdit = () => {
    fieldService.updateForm.open(fieldRef(data.node.id))
  }

  const onDelete = () => {
    fieldService.deleteModal.open(fieldRef(data.node.id))
  }

  const onAddField = () => {
    fieldService.createModal.open(
      typeRef(data.node.type.id) as Ref<IInterfaceType>,
    )
  }

  const toolbarItems = [
    {
      icon: <EditOutlined />,
      key: 'edit-field',
      onClick: onEdit,
      title: 'Edit field',
    },
    {
      icon: <DeleteOutlined />,
      key: 'delete-field',
      onClick: onDelete,
      title: 'Delete field',
    },
  ]

  if (data.node.type.maybeCurrent?.kind === 'InterfaceType') {
    toolbarItems.push({
      icon: <PlusOutlined />,
      key: 'add-field',
      onClick: onAddField,
      title: 'Add field',
    })
  }

  return (
    <CuiTreeItem
      key={data.key}
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
