import { MainPaneTemplate } from '@codelab/frontend/layout'
import React from 'react'
import { CreateLibraryModal } from '../createLibrary'
import { CreateLibraryButton } from '../createLibrary/CreateLibraryButton'
import { DeleteLibraryModal } from '../deleteLibrary/DeleteLibraryModal'
import { LibraryExplorerTree } from '../libraryExplorer/LibraryExplorerTree'
import { UpdateLibraryModal } from '../updateLibrary'

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
