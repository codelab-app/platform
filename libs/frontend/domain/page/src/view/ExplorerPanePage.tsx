import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presenter/container'
import { ExplorerPaneTemplate } from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import {
  CreatePageButton,
  CreatePageModal,
  DeletePageModal,
  PageList,
  UpdatePageModal,
} from '../use-cases'

export const ExplorerPanePage = observer(() => {
  const router = useRouter()
  const { pageService, userService } = useStore()

  const headerProps = {
    onBack: () => router.push({ pathname: PageType.AppList }),
  }

  return (
    <ExplorerPaneTemplate
      header={<CreatePageButton key={0} pageService={pageService} />}
      headerProps={headerProps}
      title="Pages"
    >
      <PageList />
      <CreatePageModal pageService={pageService} userService={userService} />
      <UpdatePageModal pageService={pageService} />
      <DeletePageModal pageService={pageService} />
    </ExplorerPaneTemplate>
  )
})
