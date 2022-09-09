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
import { extractErrorMessage } from '@codelab/frontend/shared/utils'
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
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { Alert, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import { useAsync } from 'react-use'

const StorePage: CodelabPage = observer(() => {
  const appId = useCurrentAppId()

  const {
    appService,
    storeService,
    typeService,
    actionService,
    resourceService,
  } = useStore()

  const { value, loading, error } = useAsync(async () => {
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

    return {
      app,
      appStore,
      types,
      resources,
    }
  }, [])

  return (
    <>
      <Head>
        <title>{value?.app?.name} | Store | Codelab</title>
      </Head>
      <DisplayIf condition={Boolean(error)}>
        <Alert message={extractErrorMessage(error)} type="error" />
      </DisplayIf>
      <DisplayIf condition={loading}>
        <Spin />
      </DisplayIf>
      <CreateFieldModal typeService={typeService} />
      <UpdateFieldModal typeService={typeService} />
      <DeleteFieldModal typeService={typeService} />
      {value?.appStore && (
        <>
          <CreateActionModal
            actionService={actionService}
            resourceService={resourceService}
            store={value.appStore}
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

  const appId = useCurrentAppId()

  const { loading, value } = useAsync(async () => {
    const app = await appService.getOne(appId)

    if (!app) {
      throw new Error('App not found')
    }

    const store = await storeService.getOne(app?.store.id)

    if (!store) {
      throw new Error('Store not found')
    }

    return {
      app,
      store,
    }
  }, [appId])

  return (
    <DashboardTemplate
      ConfigPane={() => (
        <StoreConfigPane
          store={value?.store}
          storeService={storeService}
          typeService={typeService}
        />
      )}
      ExplorerPane={() => (
        <StoreExplorerPane
          actionService={actionService}
          store={value?.store}
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
