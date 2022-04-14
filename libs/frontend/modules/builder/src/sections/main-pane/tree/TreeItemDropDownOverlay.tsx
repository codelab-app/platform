import { Element, WithElementService } from '@codelab/frontend/modules/element'
import { Nullable } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { ElementContextMenu } from '../ElementContextMenu'

interface TreeItemDropDownOverplayProps extends WithElementService {
  setContextMenuNodeId: (id: Nullable<string>) => void
  element: Element
}

export const TreeItemDropDownOverlay = observer(
  ({
    setContextMenuNodeId,
    element,
    elementService,
  }: TreeItemDropDownOverplayProps) => {
    const closeMenu = () => setContextMenuNodeId(null)

    const onClick = (e: React.MouseEvent) => {
      closeMenu()
      e.stopPropagation()
    }

    return (
      <>
        <div css={tw`inset-0`} onClick={onClick} />
        <ElementContextMenu
          element={element}
          elementService={elementService}
          onClick={closeMenu}
        />
      </>
    )
  },
)
