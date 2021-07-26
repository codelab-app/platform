import { CytoscapeService } from '@codelab/frontend/cytoscape'
import {
  ActionType,
  CheckedKeys,
  ComponentContext,
  ComponentElementNode,
  ComponentNode,
  CrudModal,
  EntityType,
} from '@codelab/frontend/shared'
import {
  AddChildComponentElementButton,
  AddChildComponentElementModal,
  DeleteComponentElementsButton,
  DeleteComponentElementsModal,
  UpdateComponentElementButton,
  UpdateComponentElementModal,
} from '@codelab/modules/component-element'
import { Col, Row, Space, Tree } from 'antd'
import { UpdateComponentForm } from 'libs/modules/component/src/updateComponent/UpdateComponentForm'
import React, { useContext, useState } from 'react'

export const ComponentTab = () => {
  const { component } = useContext(ComponentContext)
  const [addChildButtonState, setAddChildButtonState] = useState(true)

  const [checkedComponentElementIds, setCheckedComponentElementIds] = useState<
    Array<string>
  >([])

  const [selectedComponentElementId, setSelectedComponentElementId] = useState<
    string | undefined
  >()

  const cy = CytoscapeService.fromComponent(component as any)

  const componentElementNodeMapper = (
    data: ComponentElementNode | ComponentNode,
  ) => {
    return {
      title: 'atom' in data ? data.atom.type : data.name,
    }
  }

  const tree = CytoscapeService.antdTree(cy, componentElementNodeMapper)

  console.log(tree)

  return (
    <Row>
      <Col span={12}>
        <Tree
          onCheck={(checkedKeys, e) => {
            const { checked: _checkedComponentIds, halfChecked } =
              checkedKeys as CheckedKeys

            setCheckedComponentElementIds([
              ..._checkedComponentIds.map((id) => id.toString()),
            ])
          }}
          onSelect={([componentElementId], e) => {
            setSelectedComponentElementId(componentElementId?.toString())
            setAddChildButtonState(!e.selected)
          }}
          draggable
          showIcon
          checkable
          checkStrictly
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
          <AddChildComponentElementButton disabled={addChildButtonState} />
          <UpdateComponentElementButton
            id={selectedComponentElementId}
            disabled={!selectedComponentElementId}
          />
          <DeleteComponentElementsButton
            ids={checkedComponentElementIds}
            disabled={checkedComponentElementIds.length === 0}
          />
        </Space>
        <AddChildComponentElementModal
          parentComponentElementId={selectedComponentElementId}
        />
        <DeleteComponentElementsModal />
        <UpdateComponentElementModal />
        <CrudModal
          modalProps={{
            className: 'update-component-modal',
          }}
          entityType={EntityType.Component}
          actionType={ActionType.Update}
          okText="Update Component"
          renderForm={() => <UpdateComponentForm />}
        />
      </Col>
    </Row>
  )
}
