import { isRuntimeElement } from '@codelab/frontend/abstract/application'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import {
  HoverOverlay,
  MarginPaddingOverlay,
} from '@codelab/frontend-presentation-view/components/overlay'
import { isServer } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import { createPortal } from 'react-dom'

import { queryRenderedElementById } from '../../utils/query-rendered-element-by-id'

export const BuilderHoverOverlay = observer<{
  renderContainerRef: React.MutableRefObject<HTMLElement | null>
}>(({ renderContainerRef }) => {
  const { builderService } = useApplicationStore()
  const hoveredNode = builderService.hoveredNode?.current
  const selectedNode = builderService.selectedNode?.current

  if (isServer || !hoveredNode || !isRuntimeElement(hoveredNode)) {
    return null
  }

  const element = queryRenderedElementById(hoveredNode.element.id)

  if (
    !element ||
    !renderContainerRef.current ||
    hoveredNode.element.id === selectedNode?.treeViewNode.key
  ) {
    return null
  }

  return createPortal(
    <>
      {hoveredNode.element.id !== selectedNode?.treeViewNode.element?.id && (
        <HoverOverlay
          element={element}
          renderContainer={renderContainerRef.current}
        />
      )}
      <MarginPaddingOverlay
        element={element}
        renderContainer={renderContainerRef.current}
      />
    </>,
    renderContainerRef.current,
  )
})

BuilderHoverOverlay.displayName = 'BuilderHoverOverlay'
