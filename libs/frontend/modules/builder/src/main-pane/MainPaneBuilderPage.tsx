import { PageType } from '@codelab/frontend/model/state/router'
import {
  CreateElementButton,
  DeleteElementModal,
} from '@codelab/frontend/modules/element'
import { PageContext } from '@codelab/frontend/modules/page'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { MainPaneBuilder } from './MainPaneBuilder'

export const MainPaneBuilderPage = () => {
  const { page, loading, pageId } = useContext(PageContext)
  const router = useRouter()
  const appId = router.query.appId as string

  return (
    <MainPaneBuilder
      key={pageId}
      title={page.name}
      headerProps={{
        onBack: () =>
          router.push({
            pathname: PageType.PageList,
            query: { appId },
          }),
      }}
      header={
        <CreateElementButton
          loading={loading}
          key={0}
          parentElementId={page.rootElementId}
        />
      }
    >
      <DeleteElementModal />
    </MainPaneBuilder>
  )
}
