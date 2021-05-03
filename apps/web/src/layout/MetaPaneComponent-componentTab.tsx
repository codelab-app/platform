import { useComponentBuilder } from '@codelab/frontend/builder'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import {
  ActionType,
  CheckedKeys,
  CrudModal,
  EntityType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetComponentDetailGql,
  useAddChildComponentElementMutation,
} from '@codelab/hasura'
import {
  AddChildComponentElementButton,
  AddChildComponentElementModal,
  UpdateComponentElementButton,
} from '@codelab/modules/component-element'
import { Col, Row, Space, Tree } from 'antd'
import { UpdateComponentForm } from 'libs/modules/component/src/updateComponent/UpdateComponentForm'
import { DeleteComponentElementButton } from 'libs/modules/component-element/src/deleteComponentElement/DeleteComponentElementButton'
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

  const [addChildButtonState, setAddChildButtonState] = useState(true)

  const [checkedComponentElementIds, setCheckedComponentElementIds] = useState<
    Array<string>
  >([])

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

  console.log(checkedComponentElementIds)

  return (
    <Row>
      <Col span={12}>
        <Tree
          onCheck={(checkedKeys, e) => {
            const {
              checked: _checkedComponentIds,
              halfChecked,
            } = checkedKeys as CheckedKeys

            console.log(checkedKeys)

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
          <DeleteComponentElementButton
            ids={checkedComponentElementIds}
            disabled={checkedComponentElementIds.length === 0}
          />
        </Space>
        <AddChildComponentElementModal
          parentComponentElementId={selectedComponentElementId}
        />

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
