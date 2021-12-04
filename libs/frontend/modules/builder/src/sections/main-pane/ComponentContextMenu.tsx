import { IElement } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/model/state/router'
import { Menu } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import tw from 'twin.macro'

export interface ElementContextMenuProps {
  element: IElement
  onClick?: () => any
  onBlur?: () => any
}

/**
 * The right-click menu in the element tree for components
 */
export const ComponentContextMenu = ({
  element,
  onClick,
  onBlur,
}: ElementContextMenuProps) => {
  const { push } = useRouter()

  return (
    <Menu
      onBlur={onBlur}
      onClick={() => onClick?.()}
      css={tw`border border-gray-200 shadow-xl`}
    >
      <Menu.Item
        onClick={() =>
          push({
            pathname: PageType.ComponentDetail,
            query: { componentId: element.id },
          })
        }
        key="1"
      >
        Edit component
      </Menu.Item>
    </Menu>
  )
}

ComponentContextMenu.displayName = 'ComponentContextMenu'
