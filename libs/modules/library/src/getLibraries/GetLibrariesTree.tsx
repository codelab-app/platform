import {
  BookOutlined,
  DeleteOutlined,
  DeploymentUnitOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { useComponentBuilder } from '@codelab/frontend/builder'
import {
  ActionType,
  CrudModal,
  EntityType,
  LibraryContext,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  __ComponentFragment,
  useGetComponentDetailLazyQuery,
} from '@codelab/hasura'
import { CreateAtomForm } from '@codelab/modules/atom'
import { Button, Space, Tree } from 'antd'
import { DataNode } from 'antd/lib/tree'
import { useRouter } from 'next/router'
import React, { Key, useContext, useEffect, useState } from 'react'
import xw from 'xwind'

type CheckedKeys = {
  checked: Array<Key>
  halfChecked: Array<Key>
}

export const GetLibrariesTree = () => {
  const { libraries } = useContext(LibraryContext)
  const { selectedComponent, setSelected } = useComponentBuilder()
  const router = useRouter()

  const [
    loadComponent,
    { called, loading, data },
  ] = useGetComponentDetailLazyQuery()

  const [selectedAtomIds, setSelectedAtomIds] = useState<Array<string>>()

  const {
    reset,
    setLoading,
    openCreateModal: openCreateAtomModal,
    openUpdateModal: openUpdateAtomModal,
    openDeleteModal: openDeleteAtomModal,
  } = useCRUDModalForm(EntityType.Atom)

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
      <Space style={xw`w-full justify-between`} align="center">
        <h3>Atoms</h3>
        <Space align="center">
          <Button
            size="small"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => openCreateAtomModal()}
          />
          <Button
            size="small"
            type="primary"
            ghost
            icon={<EditOutlined />}
            // onClick={() => openUpdateAtomModal()}
          />
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              console.log(selectedAtomIds)
            }}
          />
        </Space>
      </Space>
      <CrudModal
        modalProps={{
          className: 'create-atom-modal',
        }}
        entityType={EntityType.Atom}
        actionType={ActionType.Create}
        okText="Create atom"
        renderForm={() => <CreateAtomForm />}
      />
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
            checked: checkedAtomIds,
            halfChecked,
          } = checkedKeys as CheckedKeys

          setSelectedAtomIds([...checkedAtomIds.map((id) => id.toString())])
        }}
      />

      <Space style={xw`w-full justify-between`} align="center">
        <h3 style={xw`m-0`}>Components</h3>
        <Space align="center">
          <Button
            size="small"
            type="primary"
            icon={<PlusOutlined />}
            // onClick={() => openCreateModal()}
          />
          <Button
            size="small"
            type="primary"
            ghost
            icon={<EditOutlined />}
            // onClick={() => openCreateModal()}
          />
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              console.log(selectedAtomIds)
            }}
          />
        </Space>
      </Space>
      <Tree
        onSelect={([componentId], e) => {
          loadComponent({
            variables: {
              componentId: componentId.toString(),
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
