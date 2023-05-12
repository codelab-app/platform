import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presentation/container'
import { ExplorerPaneTemplate } from '@codelab/frontend/presentation/view'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import React from 'react'
import {
  CreatePageButton,
  CreatePageForm,
  CreatePageModal,
  DeletePageModal,
  PageList,
  UpdatePageModal,
} from '../use-cases'

interface ExplorerPanePageProps {
  appId: string
}

export const ExplorerPanePage = observer(({ appId }: ExplorerPanePageProps) => {
  const router = useRouter()
  const { appService, pageService } = useStore()

  const [{ result: apps, status }, actions] = useAsync(() =>
    appService.loadAppsWithNestedPreviews({ id: appId }),
  )

  useMountEffect(actions.execute)

  const headerProps = {
    onBack: () => router.push({ pathname: PageType.AppList }),
  }

  const isLoading = status === 'loading' || status === 'not-executed'

  return (
    <ExplorerPaneTemplate
      data-testid="page-explorer-pane"
      header={<CreatePageButton key={0} />}
      headerProps={headerProps}
      title="Pages"
    >
      {!pageService.createForm.isOpen ? (
        isLoading || !apps?.[0] ? (
          <Spin />
        ) : (
          <PageList app={apps[0]} />
        )
      ) : null}
      {pageService.createForm.isOpen && <CreatePageForm />}
      <CreatePageModal />
      <UpdatePageModal />
      <DeletePageModal />
    </ExplorerPaneTemplate>
  )
})
