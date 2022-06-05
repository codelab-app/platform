import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/types'
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
  appMenuItem,
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
  const { appService, storeService, typeService } = useStore()

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

      return {
        app,
        appStore,
        types,
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
    </>
  )
})

export const getServerSideProps = withPageAuthRequired({})

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

export default StorePage

StorePage.displayName = 'StorePage'
