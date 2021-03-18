import { Frame, SerializedNodes, useEditor } from '@craftjs/core'
import React, { useContext, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { paneConfigState } from '../../../../apps/web/src/pages/builder/pane-config/Pane-config'
import { PaneConfigHandlersProps } from '../../../../apps/web/src/pages/builder/pane-config/Pane-config--handlers'
import { useOverlayToolbar } from '@codelab/frontend/builder'
import { CLICK_OVERLAY_ID } from './Overlay-click'
import { HOVER_OVERLAY_ID } from './Overlay-hover'
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
} from '@codelab/frontend/shared'

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

export const RenderComponents = ({ data }: { data: SerializedNodes }) => {
  const handlers = useComponentHandlers()

  const {
    actions: { deserialize },
  } = useEditor((s) => {
    const selectedVertexId = s.events.selected

    if (selectedVertexId !== null) {
      handlers.setPaneConfig({ pageElementId: `${s.events.selected}` })
    }
  })

  useEffect(() => {
    deserialize(data)
  }, [data, deserialize])

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <Frame data={data} />
    </div>
  )
}
