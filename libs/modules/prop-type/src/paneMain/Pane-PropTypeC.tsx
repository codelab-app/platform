import { PaneMainTemplate } from '@codelab/frontend/layout'
import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { CreatePropTypeCButton, CreatePropTypeCForm } from '../createPropTypeC'
import { DeletePropTypeCForm } from '../deletePropTypeC'
import { GetPropTypeCList } from '../getPropTypeC'
import { UpdatePropTypeCForm } from '../updatePropTypeC'

export const PaneMainPropTypeC = () => {
  return (
    <PaneMainTemplate
      title="PropTypeCollection"
      header={<CreatePropTypeCButton key={0} />}
    >
      <GetPropTypeCList />
      <CrudModal
        entityType={EntityType.PropTypeC}
        actionType={ActionType.Create}
        okText="Create PropTypeC"
        renderForm={() => <CreatePropTypeCForm />}
      />
      <CrudModal
        entityType={EntityType.PropTypeC}
        actionType={ActionType.Update}
        okText="Update PropTypeC"
        renderForm={() => <UpdatePropTypeCForm />}
      />
      <CrudModal
        entityType={EntityType.PropTypeC}
        actionType={ActionType.Delete}
        okText="Delete PropTypeC"
        renderForm={() => <DeletePropTypeCForm />}
      />
    </PaneMainTemplate>
  )
}
