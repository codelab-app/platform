import { Tree } from 'antd'
import { DataNode } from 'antd/lib/tree'
import React from 'react'

export const GetLibrariesTree = () => {
  let data: DataNode | undefined

  if (!data) {
    return null
  }

  return <Tree treeData={[data]} className="draggable-tree" />
}
