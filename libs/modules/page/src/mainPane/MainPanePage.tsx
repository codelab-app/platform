import { MainPaneTemplate } from '@codelab/frontend/layout'
import React from 'react'
import { CreatePageButton, CreatePageModal } from '../createPage'
import { DeletePageModal } from '../deletePage'
import { GetPagesList } from '../getPages'
import { UpdatePageModal } from '../updatePage'

export const MainPanePage = () => {
  return (
    <MainPaneTemplate title="Page" header={<CreatePageButton key={0} />}>
      <GetPagesList />
      <CreatePageModal />
      <UpdatePageModal />
      <DeletePageModal />
    </MainPaneTemplate>
  )
}
