import { MainPaneTemplate } from '@codelab/frontend/layout'
import { PageType } from '@codelab/frontend/shared'
import { useRouter } from 'next/router'
import React from 'react'
import { CreatePageButton, CreatePageModal } from '../../createPage'
import { DeletePageModal } from '../../deletePage'
import { GetPagesList } from '../../getPages'
import { UpdatePageModal } from '../../updatePage'

export const MainPanePage = () => {
  const router = useRouter()

  return (
    <MainPaneTemplate
      headerProps={{
        onBack: () =>
          router.push({
            pathname: PageType.AppList,
          }),
      }}
      title="Pages"
      header={<CreatePageButton key={0} />}
    >
      <GetPagesList />
      <CreatePageModal />
      <UpdatePageModal />
      <DeletePageModal />
    </MainPaneTemplate>
  )
}
