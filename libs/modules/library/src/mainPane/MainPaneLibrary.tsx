import { MainPaneTemplate } from '@codelab/frontend/layout'
import React from 'react'
import { CreateLibraryModal } from '../createLibrary'
import { CreateLibraryButton } from '../createLibrary/CreateLibraryButton'
import { DeleteLibraryModal } from '../deleteLibrary/DeleteLibraryModal'
import { GetLibrariesTree } from '../getLibraries/GetLibrariesTree'
import { UpdateLibraryModal } from '../updateLibrary'

export const MainPaneLibrary = () => {
  return (
    <MainPaneTemplate title="Library" header={<CreateLibraryButton key={0} />}>
      {/* <GetLibrariesList /> */}
      <GetLibrariesTree />
      <CreateLibraryModal />
      <UpdateLibraryModal />
      <DeleteLibraryModal />
    </MainPaneTemplate>
  )
}
