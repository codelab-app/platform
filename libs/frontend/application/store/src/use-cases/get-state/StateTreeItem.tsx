import type {
  IFieldNodeData,
  IInterfaceTypeModel,
  ITreeNode,
} from '@codelab/frontend/abstract/domain'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { useFieldService } from '@codelab/frontend-application-type/services'
import { useCreateFieldForm } from '@codelab/frontend-application-type/use-cases/create-field'
import { useDeleteFieldModal } from '@codelab/frontend-application-type/use-cases/delete-field'
import { useUpdateFieldForm } from '@codelab/frontend-application-type/use-cases/update-field'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useRouter } from 'next/navigation'

interface StateTreeItemProps {
  data: ITreeNode<IFieldNodeData>
}

export const StateTreeItem = ({ data }: StateTreeItemProps) => {
  const updateFieldForm = useUpdateFieldForm()
  const deleteFieldModal = useDeleteFieldModal()
  const createFieldForm = useCreateFieldForm()
  const { popover } = useCui()
  const { fieldDomainService } = useDomainStore()
  const { createPopover } = useFieldService()
  const router = useRouter()

  const onEdit = () => {
    updateFieldForm.open(data.extraData.node)
    popover.open(UiKey.FieldPopoverUpdate)
  }

  const onDelete = () => {
    deleteFieldModal.open(data.extraData.node)
  }

  const onAddField = () => {
    createFieldForm.open(
      data.extraData.node.type.current as IInterfaceTypeModel,
    )
    createPopover.open(router)
  }

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey: UiKey.FieldToolbarItemUpdate,
      icon: <EditOutlined />,
      onClick: onEdit,
      title: 'Edit field',
    },
    {
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
