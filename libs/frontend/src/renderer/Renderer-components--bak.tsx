/*
 * This is a backup of the previously used renderer
 */
import React, { useContext, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { paneConfigState } from '../../../../apps/web/src/pages/builder/pane-config/Pane-config'
import { PaneConfigHandlersProps } from '../../../../apps/web/src/pages/builder/pane-config/Pane-config--handlers'
import { NodeA } from '../../../modules/graph/src/core/domain/node/Node'
import { useOverlayToolbar } from '../components'
import { CLICK_OVERLAY_ID } from './Overlay-click'
import { HOVER_OVERLAY_ID } from './Overlay-hover'
import {
  AddChildVertexInput,
  GetPageGql,
  useAddChildVertexMutation,
  useUpdateVertexMutation,
} from '@codelab/generated'
import { AppContext } from 'apps/web/src/useCases/apps/AppProvider'
import { elementParameterFactory } from './elementFactory'
import useOnClickOutside from '../utils/useOnClickOutside'
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

  const { resetClickOverlay } = handlers

  const [RootComponent, props] = elementParameterFactory({
    node,
    handlers,
  })

  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => resetClickOverlay(), [resetClickOverlay])

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <RootComponent {...props}>
        {RenderChildren(node, {}, handlers)}
      </RootComponent>

      {/* <HoverOverlay />
      <DropOverlay />

      <div ref={ref}>
        <ClickOverlay />
      </div> */}
    </div>
  )
}
