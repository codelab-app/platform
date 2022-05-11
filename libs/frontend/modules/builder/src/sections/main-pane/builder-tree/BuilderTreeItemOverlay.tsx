import { ELEMENT_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { IElement } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import {
  ElementContextMenu,
  ElementContextMenuProps,
} from '../ElementContextMenu'

export type BuilderTreeItemOverlayProps = {
  setContextMenuNodeId: (id: Nullable<string>) => void
  elementContextMenuProps: Omit<ElementContextMenuProps, 'closeMenu'>
}

export const BuilderTreeItemOverlay = observer<BuilderTreeItemOverlayProps>(
  ({ setContextMenuNodeId, elementContextMenuProps }) => {
    const closeMenu = () => setContextMenuNodeId(null)

    const onClick = (e: React.MouseEvent) => {
      closeMenu()
      e.stopPropagation()
    }

    return (
      <>
        <div css={tw`inset-0`} onClick={onClick} />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <ElementContextMenu onClick={closeMenu} {...elementContextMenuProps} />
      </>
    )
  },
)
