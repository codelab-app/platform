import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useComponentBuilder } from '@codelab/frontend/builder'
import { CytoscapeService } from '@codelab/frontend/cytoscape'
import {
  ActionType,
  CrudModal,
  EntityType,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { ComponentRenderer } from '@codelab/modules/component'
import {
  CreateComponentElementButton,
  CreateComponentElementForm,
} from '@codelab/modules/component-element'
import { MainPaneLibrary } from '@codelab/modules/library'
import { Empty } from 'antd'
import { LayoutBuilder } from 'apps/web/src/layout/Layout--builder'
import { MetaPaneComponent } from 'apps/web/src/layout/MetaPaneComponent'
import React from 'react'
import xw from 'xwind'
import { NextPageLayout } from '../../src/layout/Layout.d'

const Library: NextPageLayout<'builder'> = () => {
  const { selectedComponent, setSelected } = useComponentBuilder()

  const { reset, setLoading, openCreateModal } = useCRUDModalForm(
    EntityType.ComponentElement,
  )

  if (!selectedComponent) {
    return null
  }

  const cy = CytoscapeService.fromComponent(selectedComponent)
  const root = CytoscapeService.componentTree(cy)

  return (
    <div id="Builder" css={xw`relative h-full`}>
      {root.children?.length ? (
        <ComponentRenderer component={selectedComponent} />
      ) : (
        <Empty
          description={
            <span>Your component is empty, please add a component element</span>
          }
        >
          <CreateComponentElementButton />
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
