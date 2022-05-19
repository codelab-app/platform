import { componentRef } from '@codelab/frontend/presenter/container'
import { Key } from '@codelab/frontend/view/components'
import { IComponent, IComponentService } from '@codelab/shared/abstract/core'
import { Menu } from 'antd'
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

    return (
      <Menu
        css={tw`border border-gray-200 shadow-xl`}
        onBlur={onBlur}
        onClick={() => onClick?.()}
      >
        <Menu.Item danger key="delete" onClick={onDelete}>
          <span>Delete `{component.name}` </span>{' '}
          <span>
            <Key>del</Key> <Key>{'\u232B'}</Key>
          </span>
        </Menu.Item>
      </Menu>
    )
  },
)
