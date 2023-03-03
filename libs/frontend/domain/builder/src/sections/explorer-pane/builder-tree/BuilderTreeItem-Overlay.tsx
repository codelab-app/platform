import type { IBuilderDataNode } from '@codelab/frontend/abstract/core'
import {
  isComponentPageNodeRef,
  isElementPageNodeRef,
} from '@codelab/frontend/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import type { JSXElementConstructor, PropsWithChildren } from 'react'
import React from 'react'
import tw from 'twin.macro'
import type { ComponentContextMenuProps } from '../ComponentContextMenu'
import type { ElementContextMenuProps } from '../ElementContextMenu'

export type BuilderTreeItemOverlayProps = {
  setContextMenuNodeId: (id: Nullable<string>) => void
  contextMenuProps: ElementContextMenuProps | ComponentContextMenuProps
  ContextMenu:
    | JSXElementConstructor<ElementContextMenuProps>
    | JSXElementConstructor<ComponentContextMenuProps>
} & Pick<IBuilderDataNode, 'node'>

export const BuilderTreeItemOverlay = observer<BuilderTreeItemOverlayProps>(
  ({ node, setContextMenuNodeId, contextMenuProps, ContextMenu }) => {
    const closeMenu = () => setContextMenuNodeId(null)

    const onClick = (event: React.MouseEvent) => {
      closeMenu()
      event.stopPropagation()
    }

    const Wrapper = ({ children }: PropsWithChildren) => (
      <div css={tw`inset-0`} onClick={onClick}>
        {children}
      </div>
    )

    if (isElementPageNodeRef(node)) {
      const ElementContextMenu =
        ContextMenu as JSXElementConstructor<ElementContextMenuProps>

      return (
        <Wrapper>
          <ElementContextMenu
            onClick={closeMenu}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(contextMenuProps as ElementContextMenuProps)}
          />
        </Wrapper>
      )
    }

    if (isComponentPageNodeRef(node)) {
      const ElementContextMenu =
        ContextMenu as JSXElementConstructor<ComponentContextMenuProps>

      return (
        <Wrapper>
          <ElementContextMenu
            onClick={closeMenu}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(contextMenuProps as ComponentContextMenuProps)}
          />
        </Wrapper>
      )
    }

    return null
  },
)

BuilderTreeItemOverlay.displayName = 'BuilderTreeItemOverlay'
