import React from 'react'
import { CreatePageButton } from '../createPage/CreatePageButton'
import { GetPagesList } from '../getPages'
import { PaneMainTemplate } from '@codelab/frontend/layout'
import { CreatePageModal } from '../createPage'

export const PaneMainPage = () => {
  return (
    <PaneMainTemplate title="Pages" header={<CreatePageButton key={0} />}>
      <GetPagesList />
      <CreatePageModal />
    </PaneMainTemplate>
  )
}
