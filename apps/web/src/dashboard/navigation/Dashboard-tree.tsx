import { Tree } from 'antd'
import { DataNode } from 'antd/lib/tree'
import React from 'react'
import { useRecoilState } from 'recoil'
import { dashboardDrawerState } from '../drawer/Dashboard-drawer'

export interface DashboardTreeProps {
  data?: Array<DataNode>
}

export const DashboardTree = ({ data = [] }: DashboardTreeProps) => {
  const [{ visible, vertexId }, setDashboardDrawer] = useRecoilState(
    dashboardDrawerState,
  )

  const onSelect = (id: React.Key) => {
    setDashboardDrawer({ visible: true, vertexId: `${id}` })
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
