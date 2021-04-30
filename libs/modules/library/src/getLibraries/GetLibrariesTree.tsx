import { useGetLibrariesQuery } from '@codelab/hasura'
import { Spin, Tree } from 'antd'
import React from 'react'

export const GetLibrariesTree = () => {
  const { data, loading } = useGetLibrariesQuery()

  // let data: DataNode | undefined
  if (loading) {
    return <Spin />
  }

  console.log(data)

  if (!data) {
    return null
  }

  return <Tree treeData={[]} className="draggable-tree" />
}
