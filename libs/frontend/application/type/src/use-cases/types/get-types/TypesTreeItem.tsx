import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import {
  fieldRef,
  type IInterfaceTypeModel,
  type ITypesTreeDataNode,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { FormNames } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import React from 'react'

interface TypesTreeItemProps {
  data: ITypesTreeDataNode
}

export const TypesTreeItem = ({ data }: TypesTreeItemProps) => {
  const { fieldService, typeService } = useStore()
  const { popover } = useCui()

  const onEdit = () => {
    if (data.extraData.type === 'type') {
      typeService.updateForm.open(typeRef(data.extraData.node))
      fieldService.updateForm.close()
    } else {
      fieldService.updateForm.open(fieldRef(data.extraData.node))
      typeService.updateForm.close()
    }
  }

  const onDelete = () => {
    if (data.extraData.type === 'type') {
      typeService.deleteModal.open(typeRef(data.extraData.node))
    } else {
      fieldService.deleteModal.open(fieldRef(data.extraData.node))
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

    fieldService.createForm.open(
      typeRef(interfaceType) as Ref<IInterfaceTypeModel>,
    )
    popover.open(FormNames.CreateField)
  }

  const toolbarItems = [
    {
      icon: <DeleteOutlined />,
      key: 'delete-field',
      onClick: onDelete,
      title: data.extraData.type === 'type' ? 'Delete type' : 'Delete field',
    },
  ]

  if (
    (data.extraData.type === 'field' &&
      fieldService.fieldDomainService.getField(data.extraData.node.id)?.type
        .maybeCurrent?.kind === ITypeKind.InterfaceType) ||
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
