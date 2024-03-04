import PlusOutlined from '@ant-design/icons/PlusOutlined'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateDomainModal,
  DeleteDomainModal,
  GetDomainsList,
  UpdateDomainModal,
} from '@codelab/frontend/application/domain'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import { useAppQuery } from '@codelab/frontend/presentation/container'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
} from '@codelab/frontend/presentation/view'
import { AppProperties } from '@codelab/shared/domain/mapper'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { Image, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const DomainsPageHeader = observer(() => {
  const { domainService } = useStore()
  const { appName } = useAppQuery()

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[{ title: appName || '?' }, { title: 'Domains' }]}
        />
      }
      logo={
        <Image
          alt="codelab logo"
          className="size-full"
          preview={false}
          src="/logo.png"
        />
      }
      toolbar={
        <CuiHeaderToolbar
          items={[
            {
              icon: <PlusOutlined />,
              key: '0',
              onClick: () => domainService.createModal.open(),
              title: 'Create Domain',
            },
          ]}
          title="Domains toolbar"
        />
      }
    />
  )
})

const DomainsPage: CodelabPage<DashboardTemplateProps> = (props) => {
  const { appService, userService } = useStore()
  const user = userService.user
  const { appName } = useAppQuery()

  // using loadAppsPreview in order to make sure that the domains are hydrated
  // otherwise the domains list would appear empty
  const [{ status }, loadAppWithDomains] = useAsync(() =>
    appService.loadAppsPreview({
      compositeKey: AppProperties.appCompositeKey(appName, user),
    }),
  )

  useMountEffect(loadAppWithDomains.execute)

  return (
    <>
      <Head>
        <title>{appName} | Domains | Codelab</title>
      </Head>

      <CreateDomainModal />
      <DeleteDomainModal />
      <UpdateDomainModal />

      <ContentSection>
        {status === 'loading' ? <Spin /> : <GetDomainsList />}
      </ContentSection>
    </>
  )
}

export default DomainsPage

export const getServerSideProps = withPageAuthRedirect()

DomainsPage.Layout = ({ children }) => {
  return (
    <DashboardTemplate Header={DomainsPageHeader}>
      {children()}
    </DashboardTemplate>
  )
}
