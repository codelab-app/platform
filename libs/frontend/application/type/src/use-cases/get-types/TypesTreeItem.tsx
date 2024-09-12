import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import type {
  IInterfaceTypeModel,
  ITreeNode,
  ITypeTreeNodeData,
} from '@codelab/frontend/abstract/domain'
import { UiKey } from '@codelab/frontend/abstract/types'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { useCreateFieldForm } from '../create-field'
import { useDeleteFieldModal } from '../delete-field'
import { useDeleteTypeModal } from '../delete-type'
import { useUpdateFieldForm } from '../update-field'
import { useUpdateTypeForm } from '../update-type'

interface TypesTreeItemProps {
  data: ITreeNode<ITypeTreeNodeData>
}

export const TypesTreeItem = ({ data }: TypesTreeItemProps) => {
  const createFieldForm = useCreateFieldForm()
  const updateTypeForm = useUpdateTypeForm()
  const updateFieldForm = useUpdateFieldForm()
  const deleteFieldModal = useDeleteFieldModal()
  const deleteTypeModal = useDeleteTypeModal()
  const { fieldDomainService } = useDomainStore()
  const { popover } = useCui()

  const onEdit = () => {
    if (data.extraData.type === 'type') {
      updateTypeForm.open(data.extraData.node)
      updateFieldForm.close()
    } else {
      updateFieldForm.open(data.extraData.node)
      updateTypeForm.close()
    }
  }

  const onDelete = () => {
    if (data.extraData.type === 'type') {
      deleteTypeModal.open(data.extraData.node)
    } else {
      deleteFieldModal.open(data.extraData.node)
    }
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

    const interfaceType =
      data.extraData.type === 'field'
        ? data.extraData.node.type.current
        : data.extraData.node

    createFieldForm.open(interfaceType as IInterfaceTypeModel)

    popover.open(UiKey.CreateFieldPopover)
  }

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey:
        data.extraData.type === 'type'
          ? UiKey.DeleteTypeToolbarItem
          : UiKey.DeleteFieldToolbarItem,
      icon: <DeleteOutlined />,
      onClick: onDelete,
      title: data.extraData.type === 'type' ? 'Delete type' : 'Delete field',
    },
  ]

  if (
    (data.extraData.type === 'field' &&
      fieldDomainService.getField(data.extraData.node.id)?.type.maybeCurrent
        ?.kind === ITypeKind.InterfaceType) ||
    (data.extraData.type === 'type' &&
      data.extraData.node.kind === ITypeKind.InterfaceType)
  ) {
    toolbarItems.push({
      cuiKey: UiKey.CreateFieldToolbarItem,
      icon: <PlusOutlined />,
      onClick: onAddField,
      title: 'Add field',
    })
  }

  return (
    <CuiTreeItem
      highlight={data.highlight}
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
