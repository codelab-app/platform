import { BookOutlined, DeploymentUnitOutlined } from '@ant-design/icons'
import { LibraryContext } from '@codelab/frontend/shared'
import { useGetComponentDetailLazyQuery } from '@codelab/hasura'
import {
  CreateAtomButtonIcon,
  CreateAtomModal,
  DeleteAtomButton,
  DeleteAtomsModal,
  UpdateAtomButton,
  UpdateAtomModal,
} from '@codelab/modules/atom'
import {
  CreateComponentButton,
  DeleteComponentButton,
  UpdateComponentButton,
} from '@codelab/modules/component'
import { Space, Tree } from 'antd'
import { DataNode } from 'antd/lib/tree'
import React, { Key, useContext, useState } from 'react'
import xw from 'xwind'

type CheckedKeys = {
  checked: Array<Key>
  halfChecked: Array<Key>
}

export const GetLibrariesTree = () => {
  const { libraries } = useContext(LibraryContext)

  const [
    loadComponent,
    { called, loading, data },
  ] = useGetComponentDetailLazyQuery()

  const [checkedAtomIds, setCheckedAtomIds] = useState<Array<string>>([])
  const [selectedAtomId, setSelectedAtomId] = useState<string>()
  const [selectedComponentId, setSelectedComponentId] = useState<string>()

  const [checkedComponentIds, setCheckedComponentIds] = useState<Array<string>>(
    [],
  )

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
      <Space style={xw`w-full justify-between`} align="center">
        <h3>Atoms</h3>
        <Space align="center">
          <CreateAtomButtonIcon />
          <UpdateAtomButton id={selectedAtomId} disabled={!selectedAtomId} />
          <DeleteAtomButton
            disabled={checkedAtomIds?.length === 0}
            ids={checkedAtomIds}
          />
        </Space>
      </Space>
      <CreateAtomModal />
      <UpdateAtomModal />
      <DeleteAtomsModal />
      <Tree
        draggable
        showIcon
        checkable
        checkStrictly
        selectable
        defaultExpandAll
        defaultExpandedKeys={[]}
        autoExpandParent
        treeData={atomTreeData}
        className="draggable-tree"
        onCheck={(checkedKeys, e) => {
          const {
            checked: _checkedAtomIds,
            halfChecked,
          } = checkedKeys as CheckedKeys

          setCheckedAtomIds([..._checkedAtomIds.map((id) => id.toString())])
        }}
        onSelect={([selectedKey], e) => {
          console.log(selectedKey)
          setSelectedAtomId(selectedKey?.toString())
        }}
      />

      <Space style={xw`w-full justify-between`} align="center">
        <h3 style={xw`m-0`}>Components</h3>
        <Space align="center">
          <CreateComponentButton />
          <UpdateComponentButton
            id={selectedComponentId}
            disabled={!selectedAtomId}
          />
          <DeleteComponentButton />
        </Space>
      </Space>
      <Tree
        onSelect={([componentId], e) => {
          loadComponent({
            variables: {
              componentId: componentId.toString(),
            },
          })
          setSelectedAtomId(componentId?.toString())
        }}
        onCheck={(checkedKeys, e) => {
          const {
            checked: _checkedComponentIds,
            halfChecked,
          } = checkedKeys as CheckedKeys

          setCheckedComponentIds([
            ..._checkedComponentIds.map((id) => id.toString()),
          ])
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
