import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import type {
  IFieldNodeData,
  IInterfaceTypeModel,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { fieldRef } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/infra/mobx'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import type { Ref } from 'mobx-keystone'
import React from 'react'

interface StateTreeItemProps {
  data: ITreeNode<IFieldNodeData>
}

export const StateTreeItem = ({ data }: StateTreeItemProps) => {
  const { fieldService } = useStore()
  const { popover } = useCui()

  const onEdit = () => {
    fieldService.updateForm.open(fieldRef(data.extraData.node))
    popover.open(MODEL_ACTION.UpdateField.key)
  }

  const onDelete = () => {
    fieldService.deleteModal.open(fieldRef(data.extraData.node))
  }

  const onAddField = () => {
    fieldService.createForm.open(
      data.extraData.node.type as Ref<IInterfaceTypeModel>,
    )
    popover.open(MODEL_ACTION.CreateField.key)
  }

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: MODEL_ACTION.UpdateField.key,
      icon: <EditOutlined />,
      onClick: onEdit,
      title: 'Edit field',
    },
    {
      cuiKey: MODEL_ACTION.DeleteField.key,
      icon: <DeleteOutlined />,
      onClick: onDelete,
      title: 'Delete field',
    },
  ]

  if (
    fieldService.fieldDomainService.getField(data.extraData.node.id)?.type
      .maybeCurrent?.kind === 'InterfaceType'
  ) {
    toolbarItems.push({
      cuiKey: MODEL_ACTION.CreateField.key,
      icon: <PlusOutlined />,
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
