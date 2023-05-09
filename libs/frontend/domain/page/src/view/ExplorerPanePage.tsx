import { PageType } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/presentation/container'
import { ExplorerPaneTemplate } from '@codelab/frontend/presentation/view'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
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
  const { appService } = useStore()

    const { pageService } = useStore()

    return (
      <ExplorerPaneTemplate
        header={<CreatePageButton key={0} />}
        headerProps={headerProps}
        title="Pages"
      >
        {!pageService.createForm.isOpen ? (
          loading ? (
            <Spin />
          ) : (
            <PageList />
          )
        ) : null}
        {pageService.createForm.isOpen && <CreatePageForm />}
        <CreatePageModal />
        <UpdatePageModal />
        <DeletePageModal />
      </ExplorerPaneTemplate>
    )
  },
)

  const isLoading = status === 'loading' || status === 'not-executed'

  return (
    <ExplorerPaneTemplate header={<CreatePageButton key={0} />} title="Pages">
      {isLoading || !apps?.[0] ? <Spin /> : <PageList app={apps[0]} />}

      <CreatePageModal />
      <UpdatePageModal />
      <DeletePageModal />
    </ExplorerPaneTemplate>
  )
})
