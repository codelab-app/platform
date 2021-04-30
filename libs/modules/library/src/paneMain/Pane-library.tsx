import React from 'react'
import { PaneMainTemplate } from '@codelab/frontend/layout'
import { GetLibrariesList } from '../getLibraries'
import { CreateLibraryButton } from '../createLibrary/CreateLibraryButton'
import { CrudModal, EntityType, ActionType } from '@codelab/frontend/shared'
import { CreateLibraryForm } from '../createLibrary'
import { UpdateLibraryForm } from '../updateLibrary'
import { DeleteLibraryForm } from '../deleteLibrary'
import { GetLibrariesTree } from '../getLibraries/GetLibrariesTree'

export const PaneMainLibrary = () => {
  return (
    <PaneMainTemplate title="Library" header={<CreateLibraryButton key={0} />}>
      <GetLibrariesList />
      <GetLibrariesTree />
      <CrudModal
        entityType={EntityType.Library}
        actionType={ActionType.Create}
        okText="Create library"
        renderForm={() => <CreateLibraryForm />}
      />
      <CrudModal
        entityType={EntityType.Library}
        actionType={ActionType.Update}
        okText="Update library"
        renderForm={() => <UpdateLibraryForm />}
      />
      <CrudModal
        entityType={EntityType.Library}
        actionType={ActionType.Delete}
        okText="Delete library"
        renderForm={() => <DeleteLibraryForm />}
      />
    </PaneMainTemplate>
  )
}
