import { Frame, SerializedNodes, useEditor } from '@craftjs/core'
import React, { useContext } from 'react'
import { useRecoilState } from 'recoil'
import { paneConfigState } from '../../../../apps/web/src/pages/builder/pane-config/Pane-config'
import { PaneConfigHandlersProps } from '../../../../apps/web/src/pages/builder/pane-config/Pane-config--handlers'
import { useOverlayToolbar } from '../components'
import { NodeA } from '../interfaces'
import { CLICK_OVERLAY_ID } from './Overlay-click'
import { HOVER_OVERLAY_ID } from './Overlay-hover'
import {
  AddChildVertexInput,
  GetPageGql,
  useAddChildVertexMutation,
  useUpdateVertexMutation,
} from '@codelab/generated'
import { AppContext } from 'apps/web/src/useCases/apps/AppProvider'

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

export const RenderComponents = ({
  node,
  data,
}: {
  node: NodeA
  data: SerializedNodes
}) => {
  const handlers = useComponentHandlers()

  /* const { resetClickOverlay } = handlers

     * const [RootComponent, props] = elementParameterFactory({
     *   node,
     *   handlers,
     * })

     * const ref = useRef<HTMLDivElement>(null) */

  // useOnClickOutside(ref, () => resetClickOverlay(), [resetClickOverlay])

  // console.log(node.type)

  /* const DomTree = (
   *     <RootComponent {...props}>
   *         {RenderChildren(node, {}, handlers)}
   *     </RootComponent>
   * ) */

  useEditor((s, q) => {
    const selectedVertexId = s.events.selected

    if (selectedVertexId !== null) {
      handlers.setPaneConfig({ vertexId: `${s.events.selected}` })
    }
  })

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <Frame data={data} />
      {/* {DomTree} */}

      {/* <HoverOverlay />
      <DropOverlay />

      <div ref={ref}>
        <ClickOverlay />
      </div> */}
    </div>
  )
}
