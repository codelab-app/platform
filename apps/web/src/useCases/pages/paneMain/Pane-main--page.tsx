import React from 'react'
import { PaneMainTemplate } from 'apps/web/src/templates/Pane-main--template'
import { CreatePageButton } from 'apps/web/src/useCases/pages/createPage/CreatePageButton'
import { CreatePageModal } from 'apps/web/src/useCases/pages/createPage/CreatePageModal'
import { GetPagesList } from 'apps/web/src/useCases/pages/getPages/GetPagesList'

export const PaneMainPage = () => {
  return (
    <PaneMainTemplate
      title="Pages"
      header={
        <>
          <CreatePageButton />
        </>
      }
    >
      <GetPagesList />
      <CreatePageModal />
    </PaneMainTemplate>
  )
}
