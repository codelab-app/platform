import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { GetPageGql, useDeleteVertexMutation } from '@codelab/generated'
import { AppContext, CLICK_OVERLAY_ID, NodeA } from '@codelab/frontend/shared'
import { OverlayToolbar } from '@codelab/frontend/builder'

export const ClickOverlay = () => {
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
              {/* <Button */}
              {/*  size="small" */}
              {/*  icon={<EditOutlined />} */}
              {/*  onClick={(e) => { */}
              {/*    e.stopPropagation() */}
              {/*    setPaneConfig({ visible: true, vertexId: n.id }) */}
              {/*  }} */}
              {/* /> */}

              <Button
                size="small"
                icon={<DeleteOutlined />}
                loading={loading}
                onClick={(e) => {
                  e.stopPropagation()

                  return deleteVertex({
                    variables: {
                      input: {
                        vertexId: n.id as string,
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
