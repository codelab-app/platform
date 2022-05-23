/* eslint-disable react/jsx-props-no-spreading */
import {
  COMPONENT_NODE_TYPE,
  ELEMENT_NODE_TYPE,
  IBuilderDataNode,
} from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { JSXElementConstructor, PropsWithChildren } from 'react'
import tw from 'twin.macro'
import { ComponentContextMenuProps } from '../ComponentContextMenu'
import { ElementContextMenuProps } from '../ElementContextMenu'

export type BuilderTreeItemOverlayProps = {
  setContextMenuNodeId: (id: Nullable<string>) => void
  contextMenuProps: ElementContextMenuProps | ComponentContextMenuProps
  ContextMenu:
    | JSXElementConstructor<ElementContextMenuProps>
    | JSXElementConstructor<ComponentContextMenuProps>
} & Pick<IBuilderDataNode, 'type'>

export const BuilderTreeItemOverlay = observer<BuilderTreeItemOverlayProps>(
  ({ type, setContextMenuNodeId, contextMenuProps, ContextMenu }) => {
    const closeMenu = () => setContextMenuNodeId(null)

    const onClick = (e: React.MouseEvent) => {
      closeMenu()
      e.stopPropagation()
    }

    const Wrapper = ({ children }: PropsWithChildren<any>) => (
      <div css={tw`inset-0`} onClick={onClick}>
        {children}
      </div>
    )

    if (type === ELEMENT_NODE_TYPE) {
      const ElementContextMenu =
        ContextMenu as JSXElementConstructor<ElementContextMenuProps>

      return (
        <Wrapper>
          <ElementContextMenu
            onClick={closeMenu}
            {...(contextMenuProps as ElementContextMenuProps)}
          />
        </Wrapper>
      )
    }

    if (type === COMPONENT_NODE_TYPE) {
      const ElementContextMenu =
        ContextMenu as JSXElementConstructor<ComponentContextMenuProps>

      return (
        <Wrapper>
          <ElementContextMenu
            onClick={closeMenu}
            {...(contextMenuProps as ComponentContextMenuProps)}
          />
        </Wrapper>
      )
    }

    return null
  },
)

BuilderTreeItemOverlay.displayName = 'BuilderTreeItemOverlay'
