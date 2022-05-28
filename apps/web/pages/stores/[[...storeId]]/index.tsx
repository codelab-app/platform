import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  ACTION_SERVICE,
  RESOURCE_SERVICE,
  STORE_SERVICE,
  TYPE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import {
  CreateActionButton,
  CreateActionModal,
  DeleteActionsModal,
  EditStateButton,
  GetActionsTable,
  StoreMainPane,
  UpdateActionModal,
  UpdateStateForm,
  useCurrentStore,
} from '@codelab/frontend/modules/store'
import { useStore } from '@codelab/frontend/presenter/container'
import { DisplayIf, Spinner } from '@codelab/frontend/view/components'
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

const LocalStatePage = observer<WithServices<STORE_SERVICE | TYPE_SERVICE>>(
  ({ storeService, typeService }) => (
    <>
      <PageHeader
        extra={[<EditStateButton storeService={storeService} />]}
        ghost={false}
        title="Local State"
      />
      <UpdateStateForm storeService={storeService} typeService={typeService} />
    </>
  ),
)

const ActionPage = observer<
  WithServices<ACTION_SERVICE | STORE_SERVICE | RESOURCE_SERVICE>
>(({ actionService, storeService, resourceService }) => (
  <>
    <PageHeader
      extra={[<CreateActionButton actionService={actionService} />]}
      ghost={false}
      title="Actions"
    />
    <CreateActionModal
      actionService={actionService}
      resourceService={resourceService}
      storeService={storeService}
    />
    <UpdateActionModal
      actionService={actionService}
      resourceService={resourceService}
    />
    <DeleteActionsModal actionService={actionService} />
    <GetActionsTable
      actionService={actionService}
      storeService={storeService}
    />
  </>
))

const StoresPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { actionService, storeService, typeService, resourceService } =
    useStore()

  const { store, isLoading } = useCurrentStore(storeService)

  return (
    <>
      <Head>
        <title>Stores | Codelab</title>
      </Head>
      <Spinner isLoading={isLoading}>
        <DisplayIf condition={Boolean(store)}>
          <ContentSection>
            <LocalStatePage
              storeService={storeService}
              typeService={typeService}
            />

            <div css={tw`mb-5`} />
            <ActionPage
              actionService={actionService}
              resourceService={resourceService}
              storeService={storeService}
            />
          </ContentSection>
        </DisplayIf>
      </Spinner>
    </>
  )
})

StoresPage.Layout = observer((page) => {
  const store = useStore()

  return (
    <DashboardTemplate
      MainPane={() => (
        <StoreMainPane
          storeService={store.storeService}
          userService={store.userService}
        />
      )}
      SidebarNavigation={SidebarNavigation}
    >
      {page.children}
    </DashboardTemplate>
  )
})

export const getServerSideProps = withPageAuthRequired()

export default StoresPage
