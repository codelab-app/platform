import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import type {
  IAtomsTreeDataNode,
  IInterfaceType,
} from '@codelab/frontend/abstract/core'
import { atomRef, fieldRef, typeRef } from '@codelab/frontend/abstract/core'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import type { AtomType } from '@codelab/shared/abstract/codegen'
import type { Ref } from 'mobx-keystone'
import React from 'react'
import { useGetLibrary } from './dataSource/atom-library'

interface AtomsTreeItemProps {
  data: IAtomsTreeDataNode
}

export const AtomsTreeItem = ({ data }: AtomsTreeItemProps) => {
  const { atomService, fieldService } = useStore()
  const getLibrary = useGetLibrary()
  const { node, type } = data.extraData
  const icon = type === 'atom' ? getLibrary(node.type as AtomType).icon : null

  const onEdit = () => {
    if (type === 'atom') {
      atomService.updateForm.open(atomRef(node.id))
      fieldService.updateForm.close()
    } else {
      fieldService.updateForm.open(fieldRef(node.id))
      atomService.updateForm.close()
    }
  }

  const onDelete = () => {
    if (type === 'atom') {
      atomService.deleteManyModal.open([atomRef(node.id)])
    } else {
      fieldService.deleteModal.open(fieldRef(node.id))
    }
  }

  const onAddField = () => {
    const interfaceId = node.api.id
    const interfaceRef = typeRef(interfaceId) as Ref<IInterfaceType>

    fieldService.createModal.open(interfaceRef)
  }

  const toolbarItems = [
    {
      icon: <DeleteOutlined />,
      key: 'delete-atom',
      onClick: onDelete,
      title: 'Delete atom',
    },
  ]

  if (type === 'atom') {
    toolbarItems.push({
      icon: <PlusOutlined />,
      key: 'add-field',
      onClick: onAddField,
      title: 'Add field',
    })
  }

  return (
    <CuiTreeItem
      highlight={data.highlight}
      icon={icon}
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
