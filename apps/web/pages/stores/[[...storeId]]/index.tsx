import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  CreateActionButton,
  CreateActionModal,
  DeleteActionsModal,
  EditStateButton,
  GetActionsTable,
  StoreMainPane,
  UpdateActionModal,
  UpdateInitialStateForm,
  useCurrentStore,
  WithActionService,
  WithStoreService,
} from '@codelab/frontend/modules/store'
import { WithTypeService } from '@codelab/frontend/modules/type'
import { DisplayIf, SpinnerWrapper } from '@codelab/frontend/view/components'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const InitialStatePage = observer<WithStoreService & WithTypeService>(
  ({ storeService, typeService }) => (
    <>
      <PageHeader
        extra={[<EditStateButton storeService={storeService} />]}
        ghost={false}
        title="Initial State"
      />
      <UpdateInitialStateForm
        storeService={storeService}
        typeService={typeService}
      />
    </>
  ),
)

const ActionPage = observer<WithStoreService & WithActionService>(
  ({ actionService, storeService }) => (
    <>
      <PageHeader
        extra={[<CreateActionButton actionService={actionService} />]}
        ghost={false}
        title="Actions"
      />
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
        <DisplayIf condition={Boolean(store)}>
          <ContentSection>
            <InitialStatePage
              storeService={storeService}
              typeService={typeService}
            />
            <div css={tw`mb-5`} />
            <ActionPage
              actionService={actionService}
              storeService={storeService}
            />
          </ContentSection>
        </DisplayIf>
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
