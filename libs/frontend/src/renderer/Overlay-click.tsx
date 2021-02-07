import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { SetterOrUpdater } from 'recoil'
import { OverlayToolbar } from '../components/overlay-toolbar/OverlayToolbar'
import { GetPageGql, useDeleteVertexMutation } from '@codelab/generated'
import { PaneConfigState } from 'apps/web/src/builder/pane-config/Pane-config'
import { AppContext } from 'apps/web/src/useCases/apps/AppProvider'
import { NodeA } from 'libs/modules/graph/src/core/domain/node/Node'

export const CLICK_OVERLAY_ID = 'clickOverlay'

export const ClickOverlay = ({
  setPaneConfig,
}: {
  setPaneConfig: SetterOrUpdater<PaneConfigState>
}) => {
  const { pageId } = useContext(AppContext)

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
                  setPaneConfig({ visible: true, vertexId: n.id })
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
