import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import type {
  IAtomsTreeDataNode,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import { typeRef } from '@codelab/frontend/abstract/domain'
import { FormNames } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import React from 'react'

interface AtomsTreeItemProps {
  data: IAtomsTreeDataNode
}

export const AtomsTreeItem = ({ data }: AtomsTreeItemProps) => {
  const { atomService, fieldService } = useStore()
  const { popover } = useCui()
  const { node, type } = data.extraData
  const icon = type === 'atom' ? node.library.icon : null

  const onEdit = () => {
    if (type === 'atom') {
      atomService.updateForm.open(node)
      fieldService.updateForm.close()
    } else {
      fieldService.updateForm.open(node)
      atomService.updateForm.close()
    }
  }

  const onDelete = () => {
    if (type === 'atom') {
      atomService.deleteManyModal.open([node])
    } else {
      fieldService.deleteModal.open(node)
    }
  }

  const onAddField = () => {
    const interfaceId = node.api.id

    const interfaceRef = interfaceId
      ? typeRef<IInterfaceTypeModel>(interfaceId)
      : undefined

    if (interfaceRef) {
      fieldService.createForm.open(interfaceRef.current)
      popover.open(FormNames.CreateField)
    }
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
