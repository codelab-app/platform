import type {
  IComponent,
  IComponentService,
} from '@codelab/frontend/abstract/core'
import { componentRef } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { Key } from '@codelab/frontend/presentation/view'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { BuilderTreeItemComponentTitle } from './builder-tree/BuilderTreeItem-ComponentTitle'
import type { ContextMenuProps } from './ElementContextMenu'

export type ComponentContextMenuProps = ContextMenuProps &
  Pick<IComponentService, 'deleteModal'> & {
    component: IComponent
  }

export const ComponentContextMenu = observer<ComponentContextMenuProps>(
  ({ component, deleteModal, onBlur, onClick }) => {
    const { builderService, elementService } = useStore()

    const [contextMenuItemId, setContextMenuNodeId] =
      useState<Nullable<string>>(null)

    const onDelete = () => {
      return deleteModal.open(componentRef(component.id))
    }

    const menuItems: MenuProps['items'] = [
      {
        danger: true,
        key: 'delete',
        label: (
          <>
            <span>Delete `{component.name}` </span>{' '}
            <span>
              <Key>del</Key> <Key>{'\u232B'}</Key>
            </span>
          </>
        ),
        onClick: onDelete,
      },
    ]

    return (
      <Dropdown
        menu={{
          items: menuItems,
        }}
        onOpenChange={(visible) => {
          setContextMenuNodeId(visible ? component.id : null)
        }}
        open={contextMenuItemId === component.id}
        trigger={['contextMenu']}
      >
        <div>
          <BuilderTreeItemComponentTitle
            builderService={builderService}
            component={component}
            elementService={elementService}
          />
        </div>
      </Dropdown>
    )
  },
)
