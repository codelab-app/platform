import { auth0Instance } from '@codelab/backend/adapter/auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateActionModal,
  DeleteActionsModal,
  StoreConfigPane,
  StoreExplorerPane,
  UpdateActionModal,
} from '@codelab/frontend/modules/store'
import {
  CreateFieldModal,
  DeleteFieldModal,
  UpdateFieldModal,
} from '@codelab/frontend/modules/type'
import {
  useCurrentAppId,
  useStore,
} from '@codelab/frontend/presenter/container'
import {
  extractErrorMessage,
  useStatefulExecutor,
} from '@codelab/frontend/shared/utils'
import { DisplayIf } from '@codelab/frontend/view/components'
import {
  adminMenuItems,
  allPagesMenuItem,
  appMenuItem,
  pageBuilderMenuItem,
  resourceMenuItem,
  storeMenuItem,
} from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const StorePage: CodelabPage = observer(() => {
  const appId = useCurrentAppId()

  const {
    appService,
    storeService,
    typeService,
    actionService,
    resourceService,
  } = useStore()

  const [, { isLoading, error, data }] = useStatefulExecutor(
    async () => {
      const app = await appService.getOne(appId)

      if (!app) {
        throw new Error('Failed to load app')
      }

      const appStore = await storeService.getOne(app.store.id)

      if (!appStore) {
        throw new Error('Failed to load store')
      }

      // load all types once for TypeSelect form field
      const types = await typeService.getAll()
      // load all resources once for ResourceSelect
      const resources = await resourceService.getAll()

      console.log(resources)

      return {
        app,
        appStore,
        types,
        resources,
      }
    },
    { executeOnMount: true },
  )

  return (
    <>
      <Head>
        <title>{data?.app?.name} | Store | Codelab</title>
      </Head>
      <DisplayIf condition={Boolean(error)}>
        <Alert message={extractErrorMessage(error)} type="error" />
      </DisplayIf>
      <DisplayIf condition={isLoading}>
        <Spin />
      </DisplayIf>
      <CreateFieldModal typeService={typeService} />
      <UpdateFieldModal typeService={typeService} />
      <DeleteFieldModal typeService={typeService} />
      {data?.appStore && (
        <>
          <CreateActionModal
            actionService={actionService}
            resourceService={resourceService}
            store={data.appStore}
          />
          <UpdateActionModal
            actionService={actionService}
            resourceService={resourceService}
          />
          <DeleteActionsModal actionService={actionService} />
        </>
      )}
    </>
  )
})

export const getServerSideProps = auth0Instance.withPageAuthRequired({})

StorePage.Layout = observer((page) => {
  const { actionService, appService, typeService, storeService, userService } =
    useStore()

  return (
    <DashboardTemplate
      ConfigPane={() => (
        <StoreConfigPane
          appService={appService}
          storeService={storeService}
          typeService={typeService}
        />
      )}
      ExplorerPane={() => (
        <StoreExplorerPane
          actionService={actionService}
          appService={appService}
          storeService={storeService}
          typeService={typeService}
        />
      )}
      SidebarNavigation={() => (
        <SidebarNavigation
          primaryItems={[
            appMenuItem,
            allPagesMenuItem(userService.user?.curAppId),
            pageBuilderMenuItem(
              userService.user?.curAppId,
              userService.user?.curPageId,
            ),
            storeMenuItem(userService.user?.curAppId),
            resourceMenuItem,
          ]}
          secondaryItems={adminMenuItems}
        />
      )}
    >
      {page.children}
    </DashboardTemplate>
  )
})

export default StorePage

StorePage.displayName = 'StorePage'
