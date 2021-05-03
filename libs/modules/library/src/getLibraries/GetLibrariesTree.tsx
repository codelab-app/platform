import { BookOutlined, DeploymentUnitOutlined } from '@ant-design/icons'
import { useComponentBuilder } from '@codelab/frontend/builder'
import { LibraryContext } from '@codelab/frontend/shared'
import {
  __ComponentFragment,
  useGetComponentDetailLazyQuery,
} from '@codelab/hasura'
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
  CreateComponentModal,
  DeleteComponentButton,
  DeleteComponentsModal,
  UpdateComponentButton,
  UpdateComponentModal,
} from '@codelab/modules/component'
import { Space, Tree } from 'antd'
import { DataNode } from 'antd/lib/tree'
import React, { Key, useContext, useEffect, useState } from 'react'
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

  const { selectedComponent, setSelected } = useComponentBuilder()

  useEffect(() => {
    setSelected(data?.component_by_pk as __ComponentFragment)
  }, [data])

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
          setSelectedAtomId(selectedKey?.toString())
        }}
      />

      <Space style={xw`w-full justify-between`} align="center">
        <h3 style={xw`m-0`}>Components</h3>
        <Space align="center">
          <CreateComponentButton />
          <UpdateComponentButton
            id={selectedComponentId}
            disabled={!selectedComponentId}
          />
          <DeleteComponentButton
            disabled={checkedComponentIds?.length === 0}
            ids={checkedComponentIds}
          />
        </Space>
      </Space>
      <CreateComponentModal />
      <UpdateComponentModal />
      <DeleteComponentsModal />
      <Tree
        onSelect={([checkedKey], e) => {
          const _selectedComponentId = checkedKey?.toString()
          setSelectedComponentId(_selectedComponentId)
          loadComponent({
            variables: {
              componentId: _selectedComponentId,
            },
          })
        }}
        onCheck={(checkedKeys, e) => {
          const {
            checked: _checkedComponentIds,
            halfChecked,
          } = checkedKeys as CheckedKeys

          setCheckedComponentIds([
            ..._checkedComponentIds?.map((id) => id.toString()),
          ])
        }}
        draggable
        showIcon
        checkable
        checkStrictly
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
