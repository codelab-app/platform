import { Tree } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import { useGetPageData } from '../../useCases/pages/getPage/useGetPageData'
import { usePage } from '../../useCases/pages/usePage'
import { paneConfigState } from '../pane-config/Pane-config'
import { CytoscapeService } from '@codelab/frontend'

export const PaneMainTree = () => {
  const [{ visible, vertexId }, setBuilderDrawer] = useRecoilState(
    paneConfigState,
  )
  const pageHook = usePage()

  const onSelect = (id: React.Key) => {
    setBuilderDrawer({ visible: true, vertexId: `${id}` })
  }

  const { layoutGraph, page } = useGetPageData({ pageId: pageHook.pageId })

  if (!layoutGraph || !page) {
    return null
  }

  const cy = CytoscapeService.fromGraph(layoutGraph)
  const data = CytoscapeService.antdTree(cy)

  return (
    <>
      <Tree
        className="draggable-tree"
        // defaultExpandedKeys={this.state.expandedKeys}
        draggable
        blockNode
        onSelect={([id]) => {
          onSelect(id)
        }}
        // onDrop={this.onDrop}
        treeData={[data]}
      />
    </>
  )
}
