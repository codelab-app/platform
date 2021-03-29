import React from 'react'
import { CreatePageButton } from '../createPage/CreatePageButton'
import { GetPagesList } from '../getPages/GetPagesList'
import { PaneMainTemplate } from '@codelab/frontend/layout'
import { CreatePageModal } from '../createPage/CreatePageModal'

export const PaneMainPage = () => {
  return (
    <PaneMainTemplate title="Pages" header={<CreatePageButton />}>
      <GetPagesList />
      <CreatePageModal />
    </PaneMainTemplate>
  )
}
