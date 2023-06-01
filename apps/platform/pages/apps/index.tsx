import { LogoutOutlined, PlusOutlined } from '@ant-design/icons'
import { useUser } from '@auth0/nextjs-auth0'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  BuildAppModal,
  CreateAppModal,
  DeleteAppModal,
  GetAppsList,
  ImportAppDialog,
  UpdateAppModal,
} from '@codelab/frontend/domain/app'
import type { ToolbarItem } from '@codelab/frontend/presentation//codelab-ui'
import {
  Header,
  HeaderBreadcrumb,
  HeaderToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
} from '@codelab/frontend/presentation/view'
import type { IAuth0Owner } from '@codelab/shared/abstract/core'
import { getEnv } from '@codelab/shared/config'
import { auth0Instance } from '@codelab/shared/infra/auth0'
import { useAsync } from '@react-hookz/web'
import { Image, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React, { useEffect } from 'react'
import tw from 'twin.macro'

const AppsPageHeader = observer(() => {
  const { appService } = useStore()

  const toolbarItems: Array<ToolbarItem> = [
    {
      icon: <ImportAppDialog key={0} />,
      key: '0',
      title: 'Import an app',
    },
    {
      icon: <PlusOutlined />,
      key: '1',
      onClick: () => appService.createModal.open(),
      title: 'Create an App',
    },
    {
      icon: <LogoutOutlined />,
      key: '1',
      onClick: () => {
        // redirect to /api/auth/logout
        window.location.href = '/api/auth/logout'
      },
      title: 'Sign Out',
    },
  ]

  return (
    <Header
      direction={<HeaderBreadcrumb items={[{ title: 'Apps' }]} />}
      logo={
        <Image
          alt="codelab logo"
          css={tw`w-full h-full`}
          preview={false}
          src="/logo.png"
        />
      }
      toolbar={<HeaderToolbar items={toolbarItems} title="My Header Toolbal" />}
    />
  )
})

const AppsPage: CodelabPage<DashboardTemplateProps> = (props) => {
  const { appService } = useStore()
  const { user } = useUser()

  const [{ status }, loadApp] = useAsync((owner: IAuth0Owner) =>
    appService.loadAppsWithNestedPreviews({ owner }),
  )

  useEffect(() => {
    if (user?.sub) {
      void loadApp.execute({ auth0Id: user.sub })
    }

    // in development need to execute this each time page is loaded,
    // since useUser always returns valid Auth0 user even when it does not exist in neo4j db yet
    if (user && getEnv().graphql.isLocal) {
      void fetch('/api/upsert-user')
    }
  }, [user, loadApp])

  return (
    <>
      <Head>
        <title>Apps | Codelab</title>
      </Head>

      <BuildAppModal />
      <CreateAppModal />
      <UpdateAppModal />
      <DeleteAppModal />

      <ContentSection>
        {status === 'loading' || status === 'not-executed' ? (
          <Spin />
        ) : (
          <GetAppsList />
        )}
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

AppsPage.Layout = ({ children }) => {
  return (
    <DashboardTemplate Header={AppsPageHeader}>{children()}</DashboardTemplate>
  )
}
