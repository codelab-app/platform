import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  ActionPageHeader,
  CreateActionModal,
  DeleteActionsModal,
  GetActionsTable,
  StoreMainPane,
  UpdateActionModal,
  useCurrentStoreId,
} from '@codelab/frontend/modules/store'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const StoresPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { actionService } = useStore()
  const storeId = useCurrentStoreId()

  if (!storeId) {
    return null
  }

  return (
    <>
      <Head>
        <title>Stores | Codelab</title>
      </Head>
      <>
        <CreateActionModal actionService={actionService} storeId={storeId} />
        <UpdateActionModal actionService={actionService} />
        <DeleteActionsModal actionService={actionService} />
        <ContentSection>
          <ActionPageHeader actionService={actionService} />
          <GetActionsTable actionService={actionService} storeId={storeId} />
        </ContentSection>
      </>
    </>
  )
})

StoresPage.Layout = observer((page) => {
  const store = useStore()

  return (
    <DashboardTemplate
      MainPane={() => <StoreMainPane storeService={store.storeService} />}
      SidebarNavigation={SidebarNavigation}
    >
      {page.children}
    </DashboardTemplate>
  )
})

export const getServerSideProps = withPageAuthRequired()

export default StoresPage
