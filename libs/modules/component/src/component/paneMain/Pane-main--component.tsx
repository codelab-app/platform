import React from 'react'
import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import { CreateComponentButton } from '../createComponent/CreateComponentButton'
import { CreateComponentForm } from '../createComponent/CreateComponentForm'
import { DeleteComponentForm } from '../deleteComponent/DeleteComponentForm'
import { GetComponentsList } from '../getComponents/GetComponentsList'
import { PaneMainTemplate } from '@codelab/frontend/layout'

export type ComponentItemType = {
  key: string
  id: string
  label: string
}

export const PaneMainComponent = () => {
  return (
    <PaneMainTemplate
      title="Component"
      header={<CreateComponentButton key={1} />}
    >
      <GetComponentsList />

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
        renderForm={() => <div>TODO</div>}
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
