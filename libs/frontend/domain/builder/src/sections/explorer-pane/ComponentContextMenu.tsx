import { IComponent, IComponentService } from '@codelab/frontend/abstract/core'
import { componentRef } from '@codelab/frontend/domain/component'
import { Key } from '@codelab/frontend/view/components'
import { Menu, MenuProps } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { ContextMenuProps } from './ElementContextMenu'

export type ComponentContextMenuProps = ContextMenuProps &
  Pick<IComponentService, 'deleteModal'> & {
    component: IComponent
  }

export const ComponentContextMenu = observer<ComponentContextMenuProps>(
  ({ deleteModal, onBlur, onClick, component }) => {
    const onDelete = () => {
      return deleteModal.open(componentRef(component.id))
    }

    const menuItems: MenuProps['items'] = [
      {
        label: (
          <>
            <span>Delete `{component.name}` </span>{' '}
            <span>
              <Key>del</Key> <Key>{'\u232B'}</Key>
            </span>
          </>
        ),
        danger: true,
        key: 'delete',
        onClick: onDelete,
      },
    ]

    return (
      <Menu
        css={tw`border border-gray-200 shadow-xl`}
        items={menuItems}
        onBlur={onBlur}
        onClick={() => onClick?.()}
      />
    )
  },
)
