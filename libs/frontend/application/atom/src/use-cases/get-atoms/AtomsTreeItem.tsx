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
import { useCreateFieldForm } from '@codelab/frontend-application-type/use-cases/create-field'
import { useDeleteFieldModal } from '@codelab/frontend-application-type/use-cases/delete-field'
import { useUpdateFieldForm } from '@codelab/frontend-application-type/use-cases/update-field'
import React from 'react'
import { useDeleteAtomsModal } from '../delete-atom/delete-atoms.state'
import { useUpdateAtomModal } from '../update-atom/update-atom.state'

interface AtomsTreeItemProps {
  data: ITreeNode<IAtomTreeNodeData>
}

export const AtomsTreeItem = ({ data }: AtomsTreeItemProps) => {
  const updateFieldForm = useUpdateFieldForm()
  const { popover } = useCui()
  const { node, type } = data.extraData
  const deleteFieldModal = useDeleteFieldModal()
  const icon = type === 'atom' ? node.library.icon : null
  const updateAtomForm = useUpdateAtomModal()
  const deleteAtomsModal = useDeleteAtomsModal()
  const createFieldForm = useCreateFieldForm()

  const onEdit = () => {
    if (type === 'atom') {
      updateAtomForm.open(atomRef(node))
      updateFieldForm.close()
    } else {
      updateFieldForm.open(fieldRef(node))
      updateAtomForm.close()
    }
  }

  const onDelete = () => {
    if (type === 'atom') {
      deleteAtomsModal.open([atomRef(node)])
    } else {
      deleteFieldModal.open(fieldRef(node))
    }
  }

  const onAddField = () => {
    const interfaceId = node.api.id

    const interfaceRef = interfaceId
      ? typeRef<IInterfaceTypeModel>(interfaceId)
      : undefined

    if (interfaceRef) {
      createFieldForm.open(interfaceRef)
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
