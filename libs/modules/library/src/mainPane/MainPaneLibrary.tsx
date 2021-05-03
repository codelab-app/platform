import { PaneMainTemplate } from '@codelab/frontend/layout'
import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { CreateLibraryForm } from '../createLibrary'
import { CreateLibraryButton } from '../createLibrary/CreateLibraryButton'
import { DeleteLibraryForm } from '../deleteLibrary'
import { GetLibrariesTree } from '../getLibraries/GetLibrariesTree'
import { UpdateLibraryForm } from '../updateLibrary'

export const MainPaneLibrary = () => {
  return (
    <PaneMainTemplate title="Library" header={<CreateLibraryButton key={0} />}>
      {/* <GetLibrariesList /> */}
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
