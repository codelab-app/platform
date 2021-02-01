import { Tree } from 'antd'
import { DataNode } from 'antd/lib/tree'
import React from 'react'

export interface DashboardTreeProps {
  data: Array<DataNode>
}

export const DashboardTree = ({ data }: DashboardTreeProps) => {
  return (
    <Tree
      className="draggable-tree"
      // defaultExpandedKeys={this.state.expandedKeys}
      // draggable
      blockNode
      // onDragEnter={this.onDragEnter}
      // onDrop={this.onDrop}
      treeData={data}
    />
  )
}
