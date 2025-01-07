import type {
  IAtomTreeNodeData,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import type { SyntheticEvent } from 'react'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { searchParamsAsObject } from '@codelab/frontend/shared/utils'
import { useRouter } from 'next/navigation'

import { useAtomService } from '../../services'

interface AtomsTreeItemProps {
  data: ITreeNode<IAtomTreeNodeData>
}

export const AtomsTreeItem = ({ data }: AtomsTreeItemProps) => {
  const { goToDeleteAtomPage } = useAtomService()
  const { node, type } = data.extraData
  const isAtom = type === 'atom'
  const icon = isAtom ? node.library.icon : null
  const router = useRouter()

  const onEdit = () => {
    if (isAtom) {
      router.push(
        PageType.AtomUpdate(node, {
          ...searchParamsAsObject(),
          node: node.id,
        }),
      )
    } else {
      router.push(PageType.AtomFieldUpdate(node))
    }
  }

  const onDelete = (event: SyntheticEvent) => {
    // Prevent triggering `onEdit`
    event.stopPropagation()

    if (isAtom) {
      goToDeleteAtomPage(node, router)
    } else {
      router.push(PageType.AtomFieldDelete(node))
    }
  }

  const onAddField = (event: SyntheticEvent) => {
    // Prevent triggering `onEdit`
    event.stopPropagation()

    router.push(PageType.AtomFieldCreate(node.api.id))
  }

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: isAtom
        ? UiKey.AtomsToolbarItemDelete
        : UiKey.FieldToolbarItemDelete,
      icon: <DeleteOutlined />,
      onClick: onDelete,
      title: isAtom ? 'Delete atom' : 'Delete field',
    },
  ]

  if (isAtom) {
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
