import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import { useGetCurrentStore } from '@codelab/frontend/modules/store'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const useCurrentStore = () => {
  const { stateStore } = useStore()
  const { query } = useRouter()
  const currentStoreId = query.storeId as string
  const { store } = useGetCurrentStore(currentStoreId, stateStore)

  return store
}

const StoreActionsPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const store = useCurrentStore()

  return (
    <>
      <Head>
        <title>{`${store?.name} | `}Codelab</title>
      </Head>
    </>
  )
})

const Header = observer(() => {
  const store = useCurrentStore()
  const router = useRouter()
  const headerButtons = [] as any

  return (
    <PageHeader
      extra={headerButtons}
      ghost={false}
      onBack={() => router.back()}
      title={store?.name}
    />
  )
})

export default StoreActionsPage

export const getServerSideProps = withPageAuthRequired()

StoreActionsPage.Layout = observer((page) => {
  return (
    <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
      {page.children}
    </DashboardTemplate>
  )
})
