import React, { useContext, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { paneConfigState } from '../../../../apps/web/src/builder/pane-config/Pane-config'
import { PaneConfigHandlersProps } from '../../../../apps/web/src/builder/pane-config/Pane-config--handlers'
import { NodeA } from '../../../modules/graph/src/core/domain/node/Node'
import { useOverlayToolbar } from '../components'
import useOnClickOutside from '../utils/useOnClickOutside'
import { CLICK_OVERLAY_ID, ClickOverlay } from './Overlay-click'
import { DropOverlay } from './Overlay-drop'
import { HOVER_OVERLAY_ID, HoverOverlay } from './Overlay-hover'
import { RenderChildren } from './Renderer-children'
import { elementParameterFactory } from './elementFactory'
import {
  AddChildVertexInput,
  GetPageGql,
  useAddChildVertexMutation,
  useUpdateVertexMutation,
} from '@codelab/generated'
import { AppContext } from 'apps/web/src/useCases/apps/AppProvider'

export const RenderComponents = ({ node }: { node: NodeA }) => {
  const { pageId } = useContext(AppContext)
  const [, setPaneConfig] = useRecoilState(paneConfigState)
  const [addChildVertexMutation] = useAddChildVertexMutation()
  const updateVertexMutation = useUpdateVertexMutation({
    refetchQueries: [
      {
        query: GetPageGql,
        variables: {
          input: {
            pageId,
          },
        },
      },
    ],
  })

  const addChildVertex = (input: AddChildVertexInput) =>
    addChildVertexMutation({
      refetchQueries: [{ query: GetPageGql, variables: { input: { pageId } } }],
      variables: {
        input,
      },
    })

  const {
    show: showHoverOverlay,
    reset: resetHoverOverlay,
  } = useOverlayToolbar(HOVER_OVERLAY_ID)

  const {
    show: showClickOverlay,
    reset: resetClickOverlay,
  } = useOverlayToolbar(CLICK_OVERLAY_ID)

  const handlers: PaneConfigHandlersProps = {
    setPaneConfig,
    updateVertexMutation,
    showHoverOverlay,
    resetHoverOverlay,
    showClickOverlay,
    resetClickOverlay,
    addChildVertex,
  }

  const [RootComponent, props] = elementParameterFactory({
    node,
    handlers,
  })
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => resetClickOverlay(), [resetClickOverlay])

  return (
    <div>
      <RootComponent {...props}>
        {RenderChildren(node, {}, handlers)}
      </RootComponent>

      <HoverOverlay />
      <DropOverlay />

      <div ref={ref}>
        <ClickOverlay />
      </div>
    </div>
  )
}

// RenderComponents.whyDidYouRender = true
