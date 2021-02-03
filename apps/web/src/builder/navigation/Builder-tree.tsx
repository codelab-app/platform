import { Tree } from 'antd'
import { DataNode } from 'antd/lib/tree'
import React from 'react'
import { useRecoilState } from 'recoil'
import { builderDrawerState } from '../drawer/Builder-drawer'

export interface BuilderTreeProps {
  data?: Array<DataNode>
}

export const BuilderTree = ({ data = [] }: BuilderTreeProps) => {
  const [{ visible, vertexId }, setBuilderDrawer] = useRecoilState(
    builderDrawerState,
  )

  const onSelect = (id: React.Key) => {
    setBuilderDrawer({ visible: true, vertexId: `${id}` })
  }

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
        treeData={data}
      />
    </>
  )
}
