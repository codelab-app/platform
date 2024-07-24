import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import type {
  IAtomTreeNodeData,
  IInterfaceTypeModel,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import { atomRef, fieldRef, typeRef } from '@codelab/frontend/abstract/domain'
import { MODEL_ACTION } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import React from 'react'
import { useDeleteAtomsModal } from '../delete-atom/delete-atoms-modal.state'
import { useUpdateAtomModal } from '../update-atom/update-atom-modal.state'

interface AtomsTreeItemProps {
  data: ITreeNode<IAtomTreeNodeData>
}

export const AtomsTreeItem = ({ data }: AtomsTreeItemProps) => {
  const { fieldService } = useStore()
  const { popover } = useCui()
  const { node, type } = data.extraData
  const icon = type === 'atom' ? node.library.icon : null
  const updateAtomForm = useUpdateAtomModal()
  const deleteAtomsModal = useDeleteAtomsModal()

  const onEdit = () => {
    if (type === 'atom') {
      updateAtomForm.open(atomRef(node))
      fieldService.updateForm.close()
    } else {
      fieldService.updateForm.open(fieldRef(node))
      updateAtomForm.close()
    }
  }

  const onDelete = () => {
    if (type === 'atom') {
      deleteAtomsModal.open([atomRef(node)])
    } else {
      fieldService.deleteModal.open(fieldRef(node))
    }
  }

  const onAddField = () => {
    const interfaceId = node.api.id

    const interfaceRef = interfaceId
      ? typeRef<IInterfaceTypeModel>(interfaceId)
      : undefined

    if (interfaceRef) {
      fieldService.createForm.open(interfaceRef)
      popover.open(MODEL_ACTION.CreateField.key)
    }
  }

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: MODEL_ACTION.DeleteAtom.key,
      icon: <DeleteOutlined />,
      onClick: onDelete,
      title: 'Delete atom',
    },
  ]

  if (type === 'atom') {
    toolbarItems.push({
      cuiKey: MODEL_ACTION.CreateField.key,
      icon: <PlusOutlined />,
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
