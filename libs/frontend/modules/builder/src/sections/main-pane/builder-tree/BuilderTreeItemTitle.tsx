import { ELEMENT_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { IElement, IElementService } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import styled from '@emotion/styled'
import { Dropdown } from 'antd'
import { DataNode } from 'antd/lib/tree'
import { observer } from 'mobx-react-lite'
import { PropsWithChildren, useState } from 'react'
import tw from 'twin.macro'
import { ElementContextMenuProps } from '../ElementContextMenu'
import { BuilderTreeItemOverlay } from './BuilderTreeItemOverlay'
import { ItemTitleStyle } from './ItemTitleStyle'

type BuilderTreeItemTitleProps = {
  element: IElement | undefined
  node: DataNode
  elementContextMenuProps: Omit<ElementContextMenuProps, 'element'>
}

export const BuilderTreeItemTitle = observer<BuilderTreeItemTitleProps>(
  ({ node, element, elementContextMenuProps }) => {
    const [contextMenuItemId, setContextMenuNodeId] =
      useState<Nullable<string>>(null)

    // Add CSS to disable hover if node is unselectable

    if (!element) {
      return <ItemTitleStyle node={node}>{node.title}</ItemTitleStyle>
    }

    const atomName = element.atom?.current?.name || element.atom?.current?.type
    const componentInstanceName = element.instanceOfComponent?.current?.name
    const isComponentInstance = !!element.instanceOfComponent

    const componentMeta = componentInstanceName
      ? `(instance of ${componentInstanceName || 'a Component'})`
      : undefined

    const atomMeta = atomName ? `(${atomName})` : undefined
    const meta = componentMeta || atomMeta || ''

    return (
      <ItemTitleStyle node={node}>
        <Dropdown
          onVisibleChange={(visible) =>
            setContextMenuNodeId(visible ? element.id : null)
          }
          overlay={
            <BuilderTreeItemOverlay
              elementContextMenuProps={{ ...elementContextMenuProps, element }}
              setContextMenuNodeId={setContextMenuNodeId}
            />
          }
          trigger={['contextMenu']}
          visible={contextMenuItemId === element.id}
        >
          <div css={isComponentInstance ? tw`text-blue-400` : `text-gray-400`}>
            {element.label} <span css={tw`text-xs`}>{meta}</span>
          </div>
        </Dropdown>
      </ItemTitleStyle>
    )
  },
)
