import type {
  IAtomTreeNodeData,
  IInterfaceTypeModel,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import type { SyntheticEvent } from 'react'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { typeRef } from '@codelab/frontend/abstract/domain'
import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { searchParamsAsObject } from '@codelab/frontend/shared/utils'
import { useCreateFieldForm } from '@codelab/frontend-application-type/use-cases/create-field'
import { useDeleteFieldModal } from '@codelab/frontend-application-type/use-cases/delete-field'
import { useRouter } from 'next/navigation'

import { useAtomService } from '../../services'

interface AtomsTreeItemProps {
  data: ITreeNode<IAtomTreeNodeData>
}

export const AtomsTreeItem = ({ data }: AtomsTreeItemProps) => {
  const { popover } = useCui()
  const { goToDeleteAtomPage } = useAtomService()
  const { node, type } = data.extraData
  const deleteFieldModal = useDeleteFieldModal()
  const icon = type === 'atom' ? node.library.icon : null
  const createFieldForm = useCreateFieldForm()
  const router = useRouter()

  const onEdit = () => {
    if (type === 'atom') {
      router.push(
        PageType.AtomUpdate(node, {
          ...searchParamsAsObject(),
          node: node.id,
        }),
      )
    } else {
      router.push(PageType.FieldUpdate())
    }
  }

  const onDelete = (event: SyntheticEvent) => {
    // Prevent triggering `onEdit`
    event.stopPropagation()

    if (type === 'atom') {
      console.log('delete atom')
      goToDeleteAtomPage(node, router)
    } else {
      deleteFieldModal.open(node)
    }
  }

  const onAddField = () => {
    const interfaceId = node.api.id

    const interfaceRef = interfaceId
      ? typeRef<IInterfaceTypeModel>(interfaceId)
      : undefined

    if (interfaceRef) {
      createFieldForm.open(interfaceRef.current)
      popover.open(UiKey.FieldPopoverCreate)
    }
  }

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.AtomsToolbarItemDelete,
      icon: <DeleteOutlined />,
      onClick: onDelete,
      title: 'Delete atom',
    },
  ]

  if (type === 'atom') {
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
