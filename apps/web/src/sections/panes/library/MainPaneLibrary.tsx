import {
  CreateLibraryButton,
  CreateLibraryModal,
  DeleteLibraryModal,
  LibraryExplorerTree,
  UpdateLibraryModal,
} from '@codelab/frontend/modules/library'
import React from 'react'
import { MainPaneTemplate } from '../paneTemplates'

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
