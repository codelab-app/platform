import { PaneMainTemplate } from '@codelab/frontend/layout'
import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { CreateStyleButton, CreateStyleForm } from '../createStyle'
import { DeleteStyleForm } from '../deleteStyle'
import { GetStylesList } from '../getStyles'
import { UpdateStyleForm } from '../updateStyle'

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
