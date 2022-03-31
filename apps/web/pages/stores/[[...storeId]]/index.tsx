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
  GetStateTable,
  StatePageHeader,
  StoreMainPane,
  UpdateActionModal,
  useCurrentStore,
  WithActionService,
  WithStoreService,
} from '@codelab/frontend/modules/store'
import { WithTypeService } from '@codelab/frontend/modules/type'
import {
  ConditionalView,
  SpinnerWrapper,
} from '@codelab/frontend/view/components'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const StatePage = observer<WithStoreService & WithTypeService>(
  ({ typeService, storeService }) => (
    <>
      <StatePageHeader storeService={storeService} />
      <GetStateTable storeService={storeService} typeService={typeService} />
    </>
  ),
)

const ActionPage = observer<WithStoreService & WithActionService>(
  ({ actionService, storeService }) => (
    <>
      <ActionPageHeader actionService={actionService} />
      <CreateActionModal
        actionService={actionService}
        storeService={storeService}
      />
      <UpdateActionModal actionService={actionService} />
      <DeleteActionsModal actionService={actionService} />

      <GetActionsTable
        actionService={actionService}
        storeService={storeService}
      />
    </>
  ),
)

const StoresPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { actionService, storeService, typeService } = useStore()
  const { store, isLoading } = useCurrentStore(storeService)

  return (
    <>
      <Head>
        <title>Stores | Codelab</title>
      </Head>
      <SpinnerWrapper isLoading={isLoading}>
        <ConditionalView condition={Boolean(store)}>
          <ContentSection>
            <StatePage storeService={storeService} typeService={typeService} />
            <div css={tw`mb-5`} />
            <ActionPage
              actionService={actionService}
              storeService={storeService}
            />
          </ContentSection>
        </ConditionalView>
      </SpinnerWrapper>
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
