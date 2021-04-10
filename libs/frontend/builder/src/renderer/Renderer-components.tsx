import React, { useContext, useRef } from 'react'
import { useRecoilState } from 'recoil'
import {
  elementParameterFactory,
  useOverlayToolbar,
} from '@codelab/frontend/builder'
import { ClickOverlay } from './Overlay-click'
import { HoverOverlay, HOVER_OVERLAY_ID } from './Overlay-hover'
import {
  AddChildVertexInput,
  GetPageGql,
  useAddChildVertexMutation,
  useUpdateVertexMutation,
} from '@codelab/generated'
import {
  AppContext,
  CLICK_OVERLAY_ID,
  NodeA,
  PaneConfigHandlersProps,
  paneConfigState,
  useOnClickOutside,
} from '@codelab/frontend/shared'
import { DropOverlay } from './Overlay-drop'
import { RenderChildren } from './Renderer-children'

export const useComponentHandlers = () => {
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

  return handlers
}

export const RenderComponents = ({ node }: { node: NodeA }) => {
  const handlers = useComponentHandlers()

  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => handlers.resetClickOverlay(), [
    handlers.resetClickOverlay,
  ])

  const [RootComponent, props] = elementParameterFactory({
    node,
    handlers,
  })

  if (!RootComponent) return null

  return (
    <div style={{ width: '100%', height: 'auto' }}>
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
