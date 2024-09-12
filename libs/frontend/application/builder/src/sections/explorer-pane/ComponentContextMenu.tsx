import type { IToggleService } from '@codelab/frontend/abstract/application'
import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { Key } from '@codelab/frontend-presentation-view/components/key'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { BuilderTreeItemComponentTitle } from './builder-tree/BuilderTreeItemComponentTitle'
import type { ContextMenuProps } from './ElementContextMenu'

export type ComponentContextMenuProps = ContextMenuProps & {
  component: IComponentModel
  deleteModal: IToggleService<IComponentModel>
}

export const ComponentContextMenu = observer<ComponentContextMenuProps>(
  ({ component, deleteModal, onBlur, onClick }) => {
    const [contextMenuItemId, setContextMenuNodeId] =
      useState<Nullable<string>>(null)

    const onDelete = () => {
      return deleteModal.open(component)
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
          <BuilderTreeItemComponentTitle component={component} />
        </div>
      </Dropdown>
    )
  },
)
