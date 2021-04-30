import { Empty, Tree } from 'antd'
import React, { useContext } from 'react'
import {
  ActionType,
  ComponentContext,
  CrudModal,
  EntityType,
} from '@codelab/frontend/shared'
import { PaneMainTemplate } from '@codelab/frontend/layout'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { DataNode } from 'antd/lib/tree'
import {
  CreateComponentElementButton,
  CreateComponentElementForm,
} from '@codelab/modules/component-element'
import { useBuilderSelectionState } from '@codelab/frontend/builder'

export const PaneMainComponentTree = () => {
  const { setSelected, setHovering, resetHovering } = useBuilderSelectionState()

  const { component } = useContext(ComponentContext)

  let data: DataNode | undefined

  if (component && component.elements && component.elements.length) {
    const cy = CytoscapeService.fromComponent(component)
    data = CytoscapeService.antdTree(cy)
  }

  return (
    <PaneMainTemplate
      title="Component Tree"
      header={<CreateComponentElementButton key={1} />}
    >
      {data ? (
        <Tree
          className="draggable-tree"
          blockNode
          onMouseEnter={({ node }) => {
            setHovering({
              componentElementId: (node as any).componentElementId,
              nodeId: (node as any).id,
            })
          }}
          onMouseLeave={({ node }) => {
            resetHovering()
          }}
          onSelect={([id], { node }) => {
            setSelected({
              componentElementId: (node as any).componentElementId,
              nodeId: (node as any).id,
            })
          }}
          titleRender={(node) => {
            const label = (node as any).label
            const type = (node as any).type

            return (
              <>
                {label}
                <span
                  style={{
                    color: '#787878',
                    fontWeight: 'lighter',
                    fontSize: '0.6rem',
                  }}
                >
                  ({type})
                </span>
              </>
            )
          }}
          treeData={[data]}
        />
      ) : (
        <Empty />
      )}

      <CrudModal
        modalProps={{
          className: 'create-component-element-modal',
        }}
        entityType={EntityType.ComponentElement}
        actionType={ActionType.Create}
        okText="Create component element"
        renderForm={() => <CreateComponentElementForm />}
      />
      {/*<CrudModal*/}
      {/*  modalProps={{*/}
      {/*    className: 'update-atom-modal',*/}
      {/*  }}*/}
      {/*  entityType={EntityType.Atom}*/}
      {/*  actionType={ActionType.Update}*/}
      {/*  okText="Update atom"*/}
      {/*  renderForm={() => <UpdateAtomForm />}*/}
      {/*/>*/}
      {/*<CrudModal*/}
      {/*  modalProps={{*/}
      {/*    className: 'delete-atom-modal',*/}
      {/*  }}*/}
      {/*  entityType={EntityType.Atom}*/}
      {/*  actionType={ActionType.Delete}*/}
      {/*  okText="Delete atom"*/}
      {/*  renderForm={() => <DeleteAtomForm />}*/}
      {/*/>*/}
    </PaneMainTemplate>
  )
}
