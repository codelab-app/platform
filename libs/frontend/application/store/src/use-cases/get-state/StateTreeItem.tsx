import type {
  IFieldCreateRouteLazy,
  IFieldUpdateRouteLazy,
} from '@codelab/frontend-abstract-application'
import type {
  IFieldNodeData,
  ITreeNode,
} from '@codelab/frontend-abstract-domain'
import type { ToolbarItem } from '@codelab/frontend-presentation-codelab-ui'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { UiKey } from '@codelab/frontend-abstract-types'
import { useFieldService } from '@codelab/frontend-application-type/services'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend-presentation-codelab-ui'
import { useRouter } from 'next/navigation'

export interface StateTreeItemContext {
  add: IFieldCreateRouteLazy
  update: IFieldUpdateRouteLazy
}

interface StateTreeItemProps {
  context: StateTreeItemContext
  data: ITreeNode<IFieldNodeData>
}

export const StateTreeItem = ({ context, data }: StateTreeItemProps) => {
  const { fieldDomainService } = useDomainStore()
  const { createPopover, removeMany, updatePopover } = useFieldService()
  const router = useRouter()

  const onEdit = () =>
    updatePopover.open(
      router,
      context.update({ fieldId: data.extraData.node.id }),
    )

  const onDelete = () => removeMany([data.extraData.node])

  const onAddField = () => {
    createPopover.open(
      router,
      context.add({
        interfaceId: data.extraData.node.type.id,
      }),
    )
  }

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.FieldToolbarItemUpdate,
      icon: <EditOutlined />,
      onClick: onEdit,
      title: 'Edit field',
    },
    {
      confirmText: `Are you sure you want to delete "${data.primaryTitle}"?`,
      cuiKey: UiKey.FieldToolbarItemDelete,
      icon: <DeleteOutlined />,
      onClick: onDelete,
      title: 'Delete field',
    },
  ]

  if (
    fieldDomainService.getField(data.extraData.node.id)?.type.maybeCurrent
      ?.kind === 'InterfaceType'
  ) {
    toolbarItems.push({
      cuiKey: UiKey.FieldToolbarItemCreate,
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
