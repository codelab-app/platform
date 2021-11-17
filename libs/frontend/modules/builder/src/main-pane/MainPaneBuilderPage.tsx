import { PageType } from '@codelab/frontend/model/state/router'
import { useAppState } from '@codelab/frontend/modules/app'
import {
  CreateElementButton,
  DeleteElementModal,
} from '@codelab/frontend/modules/element'
import { usePageState } from '@codelab/frontend/modules/page'
import { useRouter } from 'next/router'
import React from 'react'
import { MainPaneBuilder } from './MainPaneBuilder'

export const MainPaneBuilderPage = () => {
  const { currentApp } = useAppState()
  const { currentPage } = usePageState()
  const router = useRouter()

  const headerProps = {
    onBack: () =>
      router.push({
        pathname: PageType.PageList,
        query: { appId: currentApp?.id },
      }),
  }

  const Header = (
    <CreateElementButton key={0} parentElementId={currentPage?.rootElementId} />
  )

  return (
    <MainPaneBuilder
      key={currentPage?.id}
      title={currentPage?.name}
      headerProps={headerProps}
      header={Header}
    >
      <DeleteElementModal />
    </MainPaneBuilder>
  )
}
