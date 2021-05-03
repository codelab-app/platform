import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useComponentBuilder } from '@codelab/frontend/builder'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import {
  ActionType,
  CrudModal,
  EntityType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetComponentDetailGql,
  useAddChildComponentElementMutation,
} from '@codelab/hasura'
import { AddChildComponentElementForm } from '@codelab/modules/component-element'
import { Button, Col, Row, Space, Tree } from 'antd'
import { UpdateComponentForm } from 'libs/modules/component/src/updateComponent/UpdateComponentForm'
import React, { useState } from 'react'

export const ComponentTab = () => {
  const { selectedComponent, setSelected } = useComponentBuilder()
  const [addChildComponentElement] = useAddChildComponentElementMutation({
    refetchQueries: [{ query: GetComponentDetailGql }],
  })
  const {
    reset,
    setLoading,
    openCreateModal: openAddChildComponentModal,
  } = useCRUDModalForm(EntityType.ChildComponentElement)

  const { openUpdateModal } = useCRUDModalForm(EntityType.Component)

  const [addChildButtonState, setAddChildButtonState] = useState(true)

  const [selectedComponentElementId, setSelectedComponentElementId] = useState<
    string | undefined
  >()

  if (!selectedComponent) {
    return null
  }

  const cy = CytoscapeService.fromComponent(selectedComponent)
  const componentElementNodeMapper = (data: any) => {
    return {
      title: data.atom?.type ?? data.label,
    }
  }
  const tree = CytoscapeService.antdTree(cy, componentElementNodeMapper)

  console.log(tree)

  return (
    <Row>
      <Col span={12}>
        <Tree
          onSelect={([componentElementId], e) => {
            setSelectedComponentElementId(componentElementId.toString())
            setAddChildButtonState(!e.selected)
          }}
          draggable
          showIcon
          checkable
          selectable
          defaultExpandAll
          defaultExpandedKeys={[]}
          autoExpandParent
          treeData={tree.children ?? []}
          className="draggable-tree"
        />
      </Col>
      <Col span={12}>
        <Space>
          <Button
            type="primary"
            disabled={addChildButtonState}
            onClick={() => openAddChildComponentModal()}
            icon={<PlusOutlined />}
          />
          <Button
            type="primary"
            onClick={() => openUpdateModal(selectedComponent.id)}
            icon={<EditOutlined />}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => openUpdateModal(selectedComponent.id)}
          />
        </Space>

        <CrudModal
          modalProps={{
            className: 'update-component-modal',
          }}
          entityType={EntityType.Component}
          actionType={ActionType.Update}
          okText="Update Component"
          renderForm={() => <UpdateComponentForm />}
        />
        <CrudModal
          modalProps={{
            className: 'create-child-component-element-modal',
          }}
          entityType={EntityType.ChildComponentElement}
          actionType={ActionType.Create}
          okText="Create ComponentElement"
          renderForm={() => (
            <AddChildComponentElementForm
              componentId={selectedComponent.id}
              parentComponentElementId={selectedComponentElementId}
            />
          )}
        />
      </Col>
    </Row>
  )
}
