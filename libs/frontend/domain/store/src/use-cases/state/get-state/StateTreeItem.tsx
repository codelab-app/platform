import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type {
  IInterfaceType,
  IStateTreeDataNode,
} from '@codelab/frontend/abstract/core'
import { fieldRef, typeRef } from '@codelab/frontend/abstract/core'
import { FormNames } from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import type { Ref } from 'mobx-keystone'
import React from 'react'

interface StateTreeItemProps {
  data: IStateTreeDataNode
}

export const StateTreeItem = ({ data }: StateTreeItemProps) => {
  const { fieldService } = useStore()
  const { popover } = useCui()

  const onEdit = () => {
    fieldService.updateForm.open(fieldRef(data.extraData.node.id))
    popover.open(FormNames.UpdateField)
  }

  const onDelete = () => {
    fieldService.deleteModal.open(fieldRef(data.extraData.node.id))
  }

  const onAddField = () => {
    fieldService.createForm.open(
      typeRef(data.extraData.node.type.id) as Ref<IInterfaceType>,
    )
    popover.open(FormNames.CreateField)
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

  if (
    fieldService.getField(data.extraData.node.id)?.type.maybeCurrent?.kind ===
    'InterfaceType'
  ) {
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
