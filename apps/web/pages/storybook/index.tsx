import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import React from 'react'
import { MainPaneLibrary } from '@codelab/modules/library'
import { NextPageLayout } from '../../src/layout/Layout.d'
import { LayoutBuilder } from 'apps/web/src/layout/Layout--builder'
import { MetaPaneComponent } from 'apps/web/src/layout/MetaPaneComponent'
import { ComponentRenderer } from '@codelab/modules/component'
import {
  useComponentBuilder,
  useComponentHandlers,
} from '@codelab/frontend/builder'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import { Button, Empty } from 'antd'
import {
  ActionType,
  CrudModal,
  EntityType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { CreateComponentElementForm } from '@codelab/modules/component-element'

const Library: NextPageLayout<'builder'> = () => {
  const { selectedComponent, setSelected } = useComponentBuilder()
  const handlers = useComponentHandlers()
  const { reset, setLoading, openCreateModal } = useCRUDModalForm(
    EntityType.ComponentElement,
  )

  if (!selectedComponent) {
    return null
  }

  const cy = CytoscapeService.fromComponent(selectedComponent)
  const root = CytoscapeService.componentTree(cy)

  return (
    <div id="Builder" style={{ position: 'relative' }}>
      {root.children?.length ? (
        <ComponentRenderer component={selectedComponent} />
      ) : (
        <Empty
          description={
            <span>Your component is empty, please add a component element</span>
          }
        >
          <Button type="primary" onClick={() => openCreateModal()}>
            Add ComponentElement
          </Button>
        </Empty>
      )}
      <CrudModal
        modalProps={{
          className: 'create-component-element-modal',
        }}
        entityType={EntityType.ComponentElement}
        actionType={ActionType.Create}
        okText="Create ComponentElement"
        renderForm={() => (
          <CreateComponentElementForm componentId={selectedComponent.id} />
          // <AddChildComponentElementForm
          //   parentComponentId={selectedComponent.id}
          // />
        )}
      />
    </div>
  )
}

Library.Layout = LayoutBuilder
Library.MainPane = MainPaneLibrary
Library.MetaPane = MetaPaneComponent

export const getServerSideProps = withPageAuthRequired()

export default Library
