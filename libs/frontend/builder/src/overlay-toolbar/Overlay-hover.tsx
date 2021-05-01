import {
  builderElementSelectionState,
  OverlayToolbar,
} from '@codelab/frontend/builder'
import { ComponentElementNode } from '@codelab/frontend/shared'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { nodeToElementMapState } from '../renderer/nodeToElementMapState'

export const HoverOverlay = () => {
  const { map: nodeToElementMap } = useRecoilValue(nodeToElementMapState)
  const { hoveringElement } = useRecoilValue(builderElementSelectionState)

  const { node, element } =
    nodeToElementMap &&
    hoveringElement &&
    nodeToElementMap[hoveringElement.nodeId]
      ? nodeToElementMap[hoveringElement.nodeId]
      : { node: undefined, element: undefined }

  if (!element) {
    return null
  }

  return (
    <OverlayToolbar<ComponentElementNode>
      overlayElement={element}
      containerProps={{
        style: {
          border: '1px solid rgb(41, 205, 255)',
        },
      }}
      toolbarProps={{
        style: {
          background: 'transparent',
          color: 'rgb(41, 205, 255)',
        },
      }}
      content={<div>{node?.type}</div>}
    />
  )
}
