import { EllipsisOutlined } from '@ant-design/icons'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import {
  CreateAppButton,
  CreateAppModal,
  DeleteAppModal,
  GetAppsList,
  ImportAppButton,
  UpdateAppModal,
} from '@codelab/frontend/modules/app'
import { SignOutUserButton } from '@codelab/frontend/modules/user'
import { useStore } from '@codelab/frontend/presenter/container'
import { useStatefulExecutor } from '@codelab/frontend/shared/utils'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { Button, Dropdown, Menu, MenuProps, PageHeader, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const items: MenuProps['items'] = [
  {
    key: '1',
    icon: <ImportAppButton />,
  },
  {
    key: '0',
    icon: <SignOutUserButton type="link" />,
  },
]

const AppsPageHeader = observer(() => {
  const { appService } = useStore()

  const pageHeaderButtons = [
    <CreateAppButton appService={appService} key={0} />,
    <Dropdown key={1} overlay={<Menu items={items} />} trigger={['click']}>
      <Button icon={<EllipsisOutlined />} />
    </Dropdown>,
  ]

  return <PageHeader extra={pageHeaderButtons} ghost={false} title="Apps" />
})

const AppsPage: CodelabPage<DashboardTemplateProps> = (props) => {
  // console.debug('index.tsx', props)

  const store = useStore()

  const [, { isLoading }] = useStatefulExecutor(
    () => store.appService.getAll(),
    {
      executeOnMount: true,
    },
  )

  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>

      <CreateAppModal
        appService={store.appService}
        userService={store.userService}
      />
      <UpdateAppModal
        appService={store.appService}
        userService={store.userService}
      />
      <DeleteAppModal appService={store.appService} />

      <ContentSection>
        {isLoading && <Spin />}
        {!isLoading && <GetAppsList appService={store.appService} />}
      </ContentSection>
    </>
  )
}

//
export default AppsPage

// https://www.quintessential.gr/blog/development/how-to-integrate-redux-with-next-js-and-ssr
/**
 * This gets called on SSR, and props are passed to _app
 */
export const getServerSideProps = withPageAuthRequired()

AppsPage.Layout = (page) => {
  return (
    <DashboardTemplate
      Header={AppsPageHeader}
      SidebarNavigation={SidebarNavigation}
    >
      {page.children}
    </DashboardTemplate>
  )
}
