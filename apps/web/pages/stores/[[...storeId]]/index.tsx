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
  AddResourceButton,
  AddResourceModal,
  CreateActionButton,
  CreateActionModal,
  DeleteActionsModal,
  EditStateButton,
  GetActionsTable,
  GetStoreResourcesTable,
  RemoveResourceModal,
  Store,
  StoreMainPane,
  UpdateActionModal,
  UpdateLocalStateForm,
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
      <UpdateLocalStateForm
        storeService={storeService}
        typeService={typeService}
      />
    </>
  ),
)

type StoreResourcePage = WithServices<RESOURCE_SERVICE | STORE_SERVICE> & {
  store: Store
}

const StoreResourcePage = observer<StoreResourcePage>(
  ({ storeService, resourceService, store }) => {
    return (
      <>
        <PageHeader
          extra={[<AddResourceButton resourceService={resourceService} />]}
          ghost={false}
          title="Store Resource"
        />

        <AddResourceModal
          resourceService={resourceService}
          store={store}
          storeService={storeService}
        />

        <RemoveResourceModal
          resourceService={resourceService}
          store={store}
          storeService={storeService}
        />

        <GetStoreResourcesTable
          resourceService={resourceService}
          storeService={storeService}
        />
      </>
    )
  },
)

const ActionPage = observer<WithServices<ACTION_SERVICE | STORE_SERVICE>>(
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
            <StoreResourcePage
              resourceService={resourceService}
              store={store as Store}
              storeService={storeService}
            />
            <div css={tw`mb-5`} />
            <ActionPage
              actionService={actionService}
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
