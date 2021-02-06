import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { SetterOrUpdater, useRecoilState } from 'recoil'
import {
  PaneConfigState,
  paneConfigState,
} from '../../../../apps/web/src/builder/pane-config/Pane-config'
import { PaneConfigHandlersProps } from '../../../../apps/web/src/builder/pane-config/Pane-config--handlers'
import { NodeA } from '../../../modules/graph/src/core/domain/node/Node'
import { OverlayToolbar, useOverlayToolbar } from '../components'
import useOnClickOutside from '../utils/useOnClickOutside'
import { elementParameterFactory } from './elementFactory'
import {
  GetPageGql,
  useDeleteVertexMutation,
  useUpdateVertexMutation,
} from '@codelab/generated'

export const RenderChildren = (
  node: NodeA,
  renderProps: object,
  handlers: PaneConfigHandlersProps,
) =>
  node.children.map((child: NodeA) => {
    // TODO: remove any cast
    const [Child, props] = elementParameterFactory({
      node: child,
      handlers,
    }) as any

    return (
      <Child key={child.id} {...props} className="Builder-node">
        {RenderChildren(child, props, handlers)}
      </Child>
    )
  })

const HOVER_OVERLAY_ID = 'hoverOverlay'
const CLICK_OVERLAY_ID = 'clickOverlay'

const ClickOverlay = ({
  setBuilderDrawer,
}: {
  setBuilderDrawer: SetterOrUpdater<PaneConfigState>
}) => {
  const { query } = useRouter()
  const pageId = `${query.pageId}`

  const [deleteVertex, { loading }] = useDeleteVertexMutation({
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

  return (
    <OverlayToolbar<NodeA>
      overlayId={CLICK_OVERLAY_ID}
      content={(n) => {
        return (
          <div className="click-overlay-toolbar">
            <span>{n?.type}</span>
            <div className="click-overlay-toolbar--button-group">
              <Button
                size="small"
                icon={<EditOutlined />}
                onClick={(e) => {
                  e.stopPropagation()
                  setBuilderDrawer({ visible: true, vertexId: n.id })
                }}
              />

              <Button
                size="small"
                icon={<DeleteOutlined />}
                loading={loading}
                onClick={(e) => {
                  e.stopPropagation()

                  return deleteVertex({
                    variables: {
                      input: {
                        vertexId: n?.id,
                      },
                    },
                  })
                }}
              />
            </div>
          </div>
        )
      }}
    />
  )
}

const HoverOverlay = () => {
  return (
    <OverlayToolbar<NodeA>
      overlayId={HOVER_OVERLAY_ID}
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
      content={(n) => {
        return <div>{n?.type}</div>
      }}
    />
  )
}

export const RenderComponents = ({ node }: { node: NodeA }) => {
  const [, setBuilderDrawer] = useRecoilState(paneConfigState)
  const updateVertexMutation = useUpdateVertexMutation()

  const {
    show: showHoverOverlay,
    reset: resetHoverOverlay,
  } = useOverlayToolbar(HOVER_OVERLAY_ID)

  const {
    show: showClickOverlay,
    reset: resetClickOverlay,
  } = useOverlayToolbar(CLICK_OVERLAY_ID)

  const handlers: PaneConfigHandlersProps = {
    setBuilderDrawer,
    updateVertexMutation,
    showHoverOverlay,
    resetHoverOverlay,
    showClickOverlay,
    resetClickOverlay,
  }

  const [RootComponent, props] = elementParameterFactory({
    node,
    handlers,
  }) as any

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
        <ClickOverlay setBuilderDrawer={setBuilderDrawer} />
      </div>
    </div>
  )
}
