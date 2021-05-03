import { PaneMainTemplate } from '@codelab/frontend/layout'
import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { ComponentsTree } from '../componentsTree/ComponentsTree'
import { CreateComponentButton } from '../createComponent/CreateComponentButton'
import { CreateComponentForm } from '../createComponent/CreateComponentForm'
import { DeleteComponentForm } from '../deleteComponent/DeleteComponentForm'
import { UpdateComponentForm } from '../updateComponent/UpdateComponentForm'

export const PaneMainComponent = () => {
  return (
    <PaneMainTemplate
      title="Component"
      header={<CreateComponentButton key={1} />}
    >
      {/* <GetComponentsList /> */}
      <ComponentsTree />
      <CrudModal
        modalProps={{
          className: 'create-component-modal',
        }}
        entityType={EntityType.Component}
        actionType={ActionType.Create}
        okText="Create component"
        renderForm={() => <CreateComponentForm />}
      />
      <CrudModal
        modalProps={{
          className: 'update-component-modal',
        }}
        entityType={EntityType.Component}
        actionType={ActionType.Update}
        okText="Update component"
        renderForm={() => <UpdateComponentForm />}
      />
      <CrudModal
        modalProps={{
          className: 'delete-component-modal',
        }}
        entityType={EntityType.Component}
        actionType={ActionType.Delete}
        okText="Delete component"
        renderForm={() => <DeleteComponentForm />}
      />
    </PaneMainTemplate>
  )
}
