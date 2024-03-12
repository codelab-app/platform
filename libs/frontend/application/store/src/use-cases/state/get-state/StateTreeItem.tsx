import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import {
  fieldRef,
  type IInterfaceTypeModel,
  type IStateTreeDataNode,
} from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import type { Ref } from 'mobx-keystone'
import React from 'react'

interface StateTreeItemProps {
  data: IStateTreeDataNode
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

  const toolbarItems = [
    {
      icon: <EditOutlined />,
      key: MODEL_ACTION.UpdateField.key,
      onClick: onEdit,
      title: 'Edit field',
    },
    {
      icon: <DeleteOutlined />,
      key: MODEL_ACTION.DeleteField.key,
      onClick: onDelete,
      title: 'Delete field',
    },
  ]

  if (
    fieldService.fieldDomainService.getField(data.extraData.node.id)?.type
      .maybeCurrent?.kind === 'InterfaceType'
  ) {
    toolbarItems.push({
      icon: <PlusOutlined />,
      key: MODEL_ACTION.CreateField.key,
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
