import { BookOutlined, DeploymentUnitOutlined } from '@ant-design/icons'
import { LibraryContext } from '@codelab/frontend/shared'
import { useComponentBuilder } from '@codelab/frontend/builder'
import { Tree } from 'antd'
import { DataNode } from 'antd/lib/tree'
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  useGetComponentDetailLazyQuery,
  __ComponentFragment,
} from '@codelab/hasura'

export const GetLibrariesTree = () => {
  const { libraries } = useContext(LibraryContext)
  const { selectedComponent, setSelected } = useComponentBuilder()
  const router = useRouter()
  const [
    loadComponent,
    { called, loading, data },
  ] = useGetComponentDetailLazyQuery()

  useEffect(() => {
    setSelected(data?.component_by_pk as __ComponentFragment)
  }, [data])

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
        onSelect={([componentId], e) => {
          // router.push({
          //   pathname: PageType.LibraryList,
          //   query: {
          //     componentId: selectedKeys,
          //   },
          // })
          // setSelected(selectedKeys as string)
          loadComponent({
            variables: {
              componentId,
            },
          })
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
