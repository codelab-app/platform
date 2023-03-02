import { EllipsisOutlined } from '@ant-design/icons'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  AppImportContainer,
  BuildAppModal,
  CreateAppButton,
  CreateAppModal,
  DeleteAppModal,
  GetAppsList,
  UpdateAppModal,
} from '@codelab/frontend/domain/app'
import {
  useCurrentAppId,
  useCurrentPageId,
  useStore,
} from '@codelab/frontend/presenter/container'
import { ContentSection } from '@codelab/frontend/view/sections'
import type { DashboardTemplateProps } from '@codelab/frontend/view/templates'
import {
  DashboardTemplate,
  sidebarNavigation,
} from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Menu, PageHeader, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useAsync } from 'react-use'

const items: MenuProps['items'] = [
  {
    key: '0',
    icon: (
      <Button href="/api/auth/logout" type="link">
        Sign Out
      </Button>
    ),
  },
]

const AppsPageHeader = observer(() => {
  const { appService } = useStore()

  const pageHeaderElements = [
    <AppImportContainer appService={appService} key={0} />,
    <CreateAppButton appService={appService} key={1} />,
    <Dropdown key={2} overlay={<Menu items={items} />} trigger={['click']}>
      <Button icon={<EllipsisOutlined />} />
    </Dropdown>,
  ]

  return <PageHeader extra={pageHeaderElements} ghost={false} title="Apps" />
})

const AppsPage: CodelabPage<DashboardTemplateProps> = (props) => {
  const { userService, appService, domainService } = useStore()
  const { loading, error, value } = useAsync(() => appService.getAll(), [])
  const { value: domains } = useAsync(() => domainService.getAll(), [])

  useEffect(() => {
    // Only call this once on dev mode
    if (process.env.NEXT_PUBLIC_BUILDER_HOST?.includes('127.0.0.1')) {
      void fetch('/api/upsert-user')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>

      <BuildAppModal appService={appService} domainService={domainService} />
      <CreateAppModal appService={appService} userService={userService} />
      <UpdateAppModal appService={appService} />
      <DeleteAppModal appService={appService} />

      <ContentSection>
        {loading && <Spin />}
        {!loading && <GetAppsList appService={appService} domains={domains} />}
      </ContentSection>
    </>
  )
}

export default AppsPage

// https://www.quintessential.gr/blog/development/how-to-integrate-redux-with-next-js-and-ssr
/**
 * This gets called on SSR, and props are passed to _app
 */
export const getServerSideProps = auth0Instance.withPageAuthRequired()

AppsPage.Layout = (page) => {
  const appId = useCurrentAppId()
  const pageId = useCurrentPageId()

  return (
    <DashboardTemplate
      Header={AppsPageHeader}
      sidebarNavigation={sidebarNavigation({ appId, pageId })}
    >
      {page.children}
    </DashboardTemplate>
  )
}
