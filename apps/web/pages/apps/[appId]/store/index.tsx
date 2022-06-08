import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  ACTION_SERVICE,
  RESOURCE_SERVICE,
  STORE_SERVICE,
  TYPE_SERVICE,
  WithServices,
} from '@codelab/frontend/abstract/core'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateActionButton,
  CreateActionModal,
  DeleteActionsModal,
  EditStateButton,
  GetActionsTable,
  UpdateActionModal,
  UpdateStateForm,
} from '@codelab/frontend/modules/store'
import {
  useCurrentAppId,
  useStore,
} from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { Spinner } from '@codelab/frontend/view/components'
import {
  adminMenuItems,
  appMenuItem,
  ContentSection,
  storeMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  DashboardTemplateProps,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { IStore } from '@codelab/shared/abstract/core'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const StatePage = observer<
  WithServices<STORE_SERVICE | TYPE_SERVICE> & { store: IStore }
>(({ storeService, typeService, store }) => (
  <>
    <PageHeader
      extra={[<EditStateButton store={store} />]}
      ghost={false}
      title="State"
    />
    <UpdateStateForm
      store={store}
      storeService={storeService}
      typeService={typeService}
    />
  </>
))

type ActionPageProps = {
  store: IStore
} & WithServices<ACTION_SERVICE | STORE_SERVICE | RESOURCE_SERVICE>

const ActionPage = observer<ActionPageProps>(
  ({ actionService, storeService, resourceService, store }) => (
    <>
      <PageHeader
        extra={[<CreateActionButton actionService={actionService} />]}
        ghost={false}
        title="Actions"
      />
      <CreateActionModal
        actionService={actionService}
        resourceService={resourceService}
        store={store}
      />
      <UpdateActionModal
        actionService={actionService}
        resourceService={resourceService}
      />
      <DeleteActionsModal actionService={actionService} />
      <GetActionsTable
        actionService={actionService}
        store={store}
        storeService={storeService}
      />
    </>
  ),
)

const StorePage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const appId = useCurrentAppId()
  const store = useStore()

  const [, { isLoading, data }] = useStatefulExecutor(
    async () => {
      const app = await store.appService.getOne(appId)

      if (!app) {
        throw new Error('App not found')
      }

      const appStore = await store.storeService.getOne(app.store.id)

      return { appStore, app }
    },
    { executeOnMount: true },
  )

  return (
    <>
      <Head>
        <title>Stores | Codelab</title>
      </Head>
      <Spinner isLoading={isLoading}>
        {data?.appStore && (
          <ContentSection>
            <StatePage
              store={data?.appStore}
              storeService={store.storeService}
              typeService={store.typeService}
            />

            <div css={tw`mb-5`} />
            <ActionPage
              actionService={store.actionService}
              resourceService={store.resourceService}
              store={data?.appStore}
              storeService={store.storeService}
            />
          </ContentSection>
        )}
      </Spinner>
    </>
  )
})

StorePage.Layout = observer((page) => {
  return (
    <DashboardTemplate
      SidebarNavigation={() => (
        <SidebarNavigation
          primaryItems={[appMenuItem, storeMenuItem]}
          secondaryItems={adminMenuItems}
        />
      )}
    >
      {page.children}
    </DashboardTemplate>
  )
})

export const getServerSideProps = withPageAuthRequired()

export default StorePage
