import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type {
  IInterfaceType,
  ITypesTreeDataNode,
} from '@codelab/frontend/abstract/core'
import { fieldRef, typeRef } from '@codelab/frontend/abstract/core'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import React from 'react'

interface TypesTreeItemProps {
  data: ITypesTreeDataNode
}

export const TypesTreeItem = ({ data }: TypesTreeItemProps) => {
  const { fieldService } = useStore()

  const onEdit = () => {
    fieldService.updateModal.open(fieldRef(data.extraData.node.id))
  }

  const onDelete = () => {
    fieldService.deleteModal.open(fieldRef(data.extraData.node.id))
  }

  const onAddField = () => {
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

    const interfaceId =
      data.extraData.type === 'field'
        ? data.extraData.node.type.id
        : data.extraData.node.id

    fieldService.createModal.open(typeRef(interfaceId) as Ref<IInterfaceType>)
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
    (data.extraData.type === 'field' &&
      fieldService.getField(data.extraData.node.id)?.type.maybeCurrent?.kind ===
        ITypeKind.InterfaceType) ||
    (data.extraData.type === 'type' &&
      data.extraData.node.kind === ITypeKind.InterfaceType)
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
