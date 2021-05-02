import {
  BookOutlined,
  DeleteOutlined,
  DeploymentUnitOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  ActionType,
  CrudModal,
  EntityType,
  LibraryContext,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { CreateAtomForm } from '@codelab/modules/atom'
import { useComponentBuilder } from '@codelab/frontend/builder'
import { Button, Space, Tree } from 'antd'
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

  const { reset, setLoading, openCreateModal } = useCRUDModalForm(
    EntityType.Atom,
  )

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
      <h3>
        Atoms
        <Button
          style={{ float: 'right' }}
          size="small"
          icon={<PlusOutlined />}
          onClick={() => openCreateModal()}
        />
      </h3>
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
        selectable
        defaultExpandAll
        defaultExpandedKeys={[]}
        autoExpandParent
        treeData={atomTreeData}
        className="draggable-tree"
      />

      <Space
        style={{ width: '100%', justifyContent: 'space-between' }}
        align="center"
      >
        <h3 className="m-0">Components</h3>
        <Space>
          <Button
            size="small"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => openCreateModal()}
          />
          <Button
            size="small"
            type="primary"
            ghost
            icon={<EditOutlined />}
            onClick={() => openCreateModal()}
          />
          <Button
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => openCreateModal()}
          />
        </Space>
      </Space>
      <Tree
        onSelect={([componentId], e) => {
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
