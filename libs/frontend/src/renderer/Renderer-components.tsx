import React, { useContext, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { paneConfigState } from '../../../../apps/web/src/builder/pane-config/Pane-config'
import { PaneConfigHandlersProps } from '../../../../apps/web/src/builder/pane-config/Pane-config--handlers'
import { NodeA } from '../../../modules/graph/src/core/domain/node/Node'
import { useOverlayToolbar } from '../components'
import useOnClickOutside from '../utils/useOnClickOutside'
import { CLICK_OVERLAY_ID, ClickOverlay } from './Overlay-click'
import { HOVER_OVERLAY_ID, HoverOverlay } from './Overlay-hover'
import { RenderChildren } from './Renderer-children'
import { elementParameterFactory } from './elementFactory'
import { GetPageGql, useUpdateVertexMutation } from '@codelab/generated'
import { AppContext } from 'apps/web/src/useCases/apps/AppProvider'

export const RenderComponents = ({ node }: { node: NodeA }) => {
  const { pageId } = useContext(AppContext)
  const [, setPaneConfig] = useRecoilState(paneConfigState)
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
  }

  const [RootComponent, props] = elementParameterFactory({
    node,
    handlers,
  })
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => {
    resetClickOverlay()
  })

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <RootComponent {...props}>
        {RenderChildren(node, {}, handlers)}
      </RootComponent>

      <HoverOverlay />

      <div ref={ref}>
        <ClickOverlay setPaneConfig={setPaneConfig} />
      </div>
    </div>
  )
}

RenderComponents.whyDidYouRender = true
