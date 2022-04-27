import { ELEMENT_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { IElement } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { ElementContextMenu } from '../ElementContextMenu'

type BuilderTreeItemOverlayProps = WithServices<ELEMENT_SERVICE> & {
  setContextMenuNodeId: (id: Nullable<string>) => void
  element: IElement
}

export const BuilderTreeItemOverlay = observer<BuilderTreeItemOverlayProps>(
  ({ setContextMenuNodeId, element, elementService }) => {
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
