import { PageType } from '@codelab/frontend/abstract/types'
import {
  useCurrentApp,
  useStore,
} from '@codelab/frontend/presentation/container'
import { ExplorerPaneTemplate } from '@codelab/frontend/presentation/view'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import {
  CreatePageButton,
  CreatePageForm,
  DeletePageModal,
  PageList,
} from '../use-cases'
import { UpdatePageForm } from '../use-cases/update-page/UpdatePageForm'

export const ExplorerPanePage = observer(() => {
  const router = useRouter()
  const { pageService } = useStore()
  const { app } = useCurrentApp()

  const headerProps = {
    onBack: () => router.push({ pathname: PageType.AppList }),
  }

  return (
    <ExplorerPaneTemplate
      data-testid="page-explorer-pane"
      header={<CreatePageButton key={0} />}
      headerProps={headerProps}
      title="Pages"
    >
      {!pageService.createForm.isOpen && !pageService.updateForm.isOpen ? (
        !app ? (
          <Spin />
        ) : (
          <PageList app={app} />
        )
      ) : null}
      {pageService.createForm.isOpen && <CreatePageForm />}
      {pageService.updateForm.isOpen && <UpdatePageForm />}
      <DeletePageModal />
    </ExplorerPaneTemplate>
  )
})
