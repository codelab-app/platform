import { BookOutlined, DeploymentUnitOutlined } from '@ant-design/icons'
import { LibraryContext } from '@codelab/frontend/shared'
import { useComponentBuilder } from '@codelab/frontend/builder'
import { Tree } from 'antd'
import { DataNode } from 'antd/lib/tree'
import React, { useContext } from 'react'

export const GetLibrariesTree = () => {
  const { libraries } = useContext(LibraryContext)
  const { selectionState } = useComponentBuilder()
  console.log(selectionState)

  const atomTreeData: Array<DataNode> = (libraries ?? []).map((library) => {
    return {
      title: `${library.name}`,
      key: library.id,
      icon: <BookOutlined />,
      selectable: false,
      checkable: false,
      children: library.atoms.map((atom) => {
        return {
          title: atom.type,
          key: atom.id,
          icon: <DeploymentUnitOutlined />,
        }
      }),
    }
  })

  const componentTreeData: Array<DataNode> = (libraries ?? []).map(
    (library) => {
      return {
        title: `${library.name}`,
        key: library.id,
        icon: <BookOutlined />,
        selectable: false,
        checkable: false,
        children: library.components.map((component) => {
          return {
            title: component.label,
            key: component.id,

            icon: <DeploymentUnitOutlined />,
          }
        }),
      }
    },
  )

  return (
    <>
      <h3>Atoms</h3>
      <Tree
        draggable
        showIcon
        checkable
        selectable
        defaultExpandAll
        defaultExpandedKeys={[]}
        autoExpandParent
        treeData={atomTreeData}
        className="draggable-tree"
      />

      <h3>Components</h3>
      <Tree
        onSelect={(selectedKeys, e) => {
          console.log(selectedKeys, e)
        }}
        draggable
        showIcon
        checkable
        selectable
        defaultExpandAll
        defaultExpandedKeys={[]}
        autoExpandParent
        treeData={componentTreeData}
        className="draggable-tree"
      />
    </>
  )
}
