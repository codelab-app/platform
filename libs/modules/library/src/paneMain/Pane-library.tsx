import React from 'react'
import { PaneMainTemplate } from '@codelab/frontend/layout'
import { GetLibrariesList } from '../getLibraries'
import { CreateLibraryButton } from '../createLibrary/CreateLibraryButton'
import { CrudModal, EntityType, FormType } from '@codelab/frontend/shared'
import { CreateLibraryForm } from '../createLibrary'
import { UpdateLibraryForm } from '../updateLibrary'
import { DeleteLibraryForm } from '../deleteLibrary'

export const PaneMainLibrary = () => {
  return (
    <PaneMainTemplate title="Library" header={<CreateLibraryButton key={0} />}>
      <GetLibrariesList />
      <CrudModal
        entityType={EntityType.Library}
        actionType={FormType.Create}
        okText="Create library"
        renderForm={() => <CreateLibraryForm />}
      />
      <CrudModal
        entityType={EntityType.Library}
        actionType={FormType.Update}
        okText="Update library"
        renderForm={() => <UpdateLibraryForm />}
      />
      <CrudModal
        entityType={EntityType.Library}
        actionType={FormType.Delete}
        okText="Delete library"
        renderForm={() => <DeleteLibraryForm />}
      />
    </PaneMainTemplate>
  )
}
