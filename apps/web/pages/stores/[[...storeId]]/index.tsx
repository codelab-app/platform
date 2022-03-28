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
import { ConditionalView } from '@codelab/frontend/view/components'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect } from 'react'

const StoresPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { actionService, storeService } = useStore()
  const storeId = useCurrentStoreId()

  useEffect(() => {
    if (storeId) {
      storeService.setCurrentStoreId(storeId)
    }
  }, [storeId])

  return (
    <>
      <Head>
        <title>Stores | Codelab</title>
      </Head>
      <ConditionalView condition={Boolean(storeService.currentStoreId)}>
        <CreateActionModal
          actionService={actionService}
          storeId={storeService.currentStoreId}
        />
        <UpdateActionModal actionService={actionService} />
        <DeleteActionsModal actionService={actionService} />
        <ContentSection>
          <ActionPageHeader actionService={actionService} />
          <GetActionsTable
            actionService={actionService}
            storeService={storeService}
          />
        </ContentSection>
      </ConditionalView>
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
