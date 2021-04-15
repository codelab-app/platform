import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { AppContext, NodeA } from '@codelab/frontend/shared'
import {
  builderElementSelectionState,
  OverlayToolbar,
} from '@codelab/frontend/builder'
import { useRecoilValue } from 'recoil'
import { RootAppGql, useDeletePageElementMutation } from '@codelab/hasura'
import { nodeToElementMapState } from '../renderer/nodeToElementMapState'

export const ClickOverlay = () => {
  const { pageId, appId } = useContext(AppContext)

  const [
    deletePageElement,
    { loading: deleteLoading },
  ] = useDeletePageElementMutation({
    refetchQueries: [
      {
        query: RootAppGql,
        variables: {
          pageId,
          appId,
        },
      },
    ],
  })

  const { map: nodeToElementMap } = useRecoilValue(nodeToElementMapState)
  const { selectedElement } = useRecoilValue(builderElementSelectionState)

  const { node, element } =
    nodeToElementMap &&
    selectedElement &&
    nodeToElementMap[selectedElement.nodeId]
      ? nodeToElementMap[selectedElement.nodeId]
      : { node: undefined, element: undefined }

  if (!element) {
    return null
  }

  return (
    <OverlayToolbar<NodeA>
      overlayElement={element}
      content={
        <div className="click-overlay-toolbar">
          <span>{node?.type}</span>
          <div className="click-overlay-toolbar--button-group">
            <Button
              size="small"
              icon={<DeleteOutlined />}
              loading={deleteLoading}
              onClick={(e) => {
                e.stopPropagation()

                return deletePageElement({
                  variables: {
                    pageElementId: (node as any)?.pageElementId as string,
                  },
                })
              }}
            />
          </div>
        </div>
      }
    />
  )
}
