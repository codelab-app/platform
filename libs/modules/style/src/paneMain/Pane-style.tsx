import React from 'react'
import { CreateStyleButton, CreateStyleForm } from '../createStyle'
import { PaneMainTemplate } from '@codelab/frontend/layout'
import { GetStylesList } from '../getStyles'
import { CrudModal, EntityType, ActionType } from '@codelab/frontend/shared'
import { UpdateStyleForm } from '../updateStyle'
import { DeleteStyleForm } from '../deleteStyle'

export const PaneMainStyle = (): JSX.Element => {
  return (
    <PaneMainTemplate title="Style" header={<CreateStyleButton key={0} />}>
      <GetStylesList />
      <CrudModal
        entityType={EntityType.Style}
        actionType={ActionType.Create}
        okText="Create style"
        renderForm={() => <CreateStyleForm />}
      />
      <CrudModal
        entityType={EntityType.Style}
        actionType={ActionType.Update}
        okText="Update style"
        renderForm={() => <UpdateStyleForm />}
      />
      <CrudModal
        entityType={EntityType.Style}
        actionType={ActionType.Delete}
        okText="Delete style"
        renderForm={() => <DeleteStyleForm />}
      />
    </PaneMainTemplate>
  )
}
