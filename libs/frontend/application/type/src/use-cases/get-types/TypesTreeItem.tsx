import type { ITypeUpdateRoute } from '@codelab/frontend/abstract/application'
import type {
  ITreeNode,
  ITypeTreeNodeData,
} from '@codelab/frontend/abstract/domain'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import type { SyntheticEvent } from 'react'

import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import { IRouteType, RoutePaths } from '@codelab/frontend/abstract/application'
import { UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiTreeItem,
  CuiTreeItemToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { useRouter } from 'next/navigation'

interface TypesTreeItemProps {
  context: ITypeUpdateRoute
  data: ITreeNode<ITypeTreeNodeData>
}

export const TypesTreeItem = ({ context, data }: TypesTreeItemProps) => {
  const { fieldDomainService } = useDomainStore()
  const router = useRouter()

  const onEdit = ({ selectedKey }: { selectedKey?: string }) => {
    if (data.extraData.type === 'type') {
      router.push(RoutePaths.Type.update(context))
    } else {
      router.push(
        RoutePaths.Type.field.update({
          params: { fieldId: data.extraData.node.id },
          searchParams: { selectedKey },
        }),
      )
    }
  }

  const onDelete = (
    event: SyntheticEvent,
    { selectedKey }: { selectedKey?: string },
  ) => {
    // Prevent triggering `onEdit`
    event.stopPropagation()

    if (data.extraData.type === 'type') {
      router.push(RoutePaths.Type.delete(data.extraData.node))
    } else {
      router.push(
        RoutePaths.Type.field.delete({
          params: { fieldId: data.extraData.node.id },
          searchParams: { selectedKey },
        }),
      )
    }
  }

  const onAddField = (
    event: SyntheticEvent,
    { selectedKey }: { selectedKey?: string },
  ) => {
    // Prevent triggering `onEdit`
    event.stopPropagation()

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

    router.push(
      RoutePaths.Type.field.create({
        params: { interfaceId: interfaceType.id },
        searchParams: { selectedKey },
      }),
    )
  }

  const toolbarItems: Array<ToolbarItem> = [
    {
      cuiKey:
        data.extraData.type === 'type'
          ? UiKey.TypeToolbarItemDelete
          : UiKey.FieldToolbarItemDelete,
      icon: <DeleteOutlined />,
      onClick: (event: SyntheticEvent) =>
        onDelete(event, {
          selectedKey: data.extraData.node.id,
        }),
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
      cuiKey: UiKey.FieldToolbarItemCreate,
      icon: <PlusOutlined />,
      onClick: (event: SyntheticEvent) =>
        onAddField(event, { selectedKey: data.extraData.node.id }),
      title: 'Add field',
    })
  }

  return (
    <CuiTreeItem
      highlight={data.highlight}
      key={data.key}
      onClick={(event) => onEdit({ selectedKey: data.key.toString() })}
      primaryTitle={data.primaryTitle}
      secondaryTitle={data.secondaryTitle}
      selectedKey={data.key}
      toolbar={
        <CuiTreeItemToolbar
          items={toolbarItems}
          title="State Tree Item toolbar"
        />
      }
    />
  )
}
