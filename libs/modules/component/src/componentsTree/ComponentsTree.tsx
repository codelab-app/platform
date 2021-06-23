import { DeploymentUnitOutlined, DownOutlined } from '@ant-design/icons'
import { useGetComponentsQuery } from '@codelab/codegen/hasura'
import { Tree } from 'antd'
import React from 'react'

export const ComponentsTree = () => {
  const { data: components } = useGetComponentsQuery()

  console.log(components)

  // const componentsData: Array<ComponentItemType> | undefined = useMemo(
  //   () =>
  //     components?.component.map((component) => ({
  //       key: component.id,
  //       label: component.label,
  //       id: component.id,
  //     })),
  //   [components, components?.component],
  // )

  const treeData = components?.component?.map((component) => {
    return {
      icon: <DeploymentUnitOutlined />,
      title: component.label,
      key: component.id,
    }
  })

  return (
    <Tree
      switcherIcon={<DownOutlined />}
      showIcon
      checkable
      defaultExpandedKeys={[]}
      autoExpandParent
      treeData={treeData}
      className="draggable-tree"
    />
  )
}
