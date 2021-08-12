import { MainPaneTemplate } from '@codelab/frontend/view/templates'
import React from 'react'
import { LibraryExplorerTree } from './library-explorer'
import {
  CreateLibraryButton,
  CreateLibraryModal,
} from './use-cases/create-library'
import { DeleteLibraryModal } from './use-cases/delete-library'
import { UpdateLibraryModal } from './use-cases/update-library'

export const MainPaneLibrary = () => {
  return (
    <MainPaneTemplate title="Library" header={<CreateLibraryButton key={0} />}>
      {/* <GetLibrariesList /> */}
      <LibraryExplorerTree />
      <CreateLibraryModal />
      <UpdateLibraryModal />
      <DeleteLibraryModal />
    </MainPaneTemplate>
  )
}
