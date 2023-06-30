import { PlusOutlined } from '@ant-design/icons'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateDomainModal,
  DeleteDomainModal,
  GetDomainsList,
  UpdateDomainModal,
} from '@codelab/frontend/domain/domain'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation//codelab-ui'
import {
  useCurrentApp,
  useStore,
} from '@codelab/frontend/presentation/container'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
} from '@codelab/frontend/presentation/view'
import { useAsync, useMountEffect } from '@react-hookz/web'
import { Image, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const DomainsPageHeader = observer(() => {
  const { domainService } = useStore()
  const { appName } = useCurrentApp()

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
          css={tw`w-full h-full`}
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
  const { appService } = useStore()
  const { _compoundName } = useCurrentApp()

  const [{ result, status }, getApp] = useAsync(() =>
    // eslint-disable-next-line @typescript-eslint/naming-convention
    appService.getAll({ _compoundName }),
  )

  const app = result?.[0]

  useMountEffect(getApp.execute)

  return (
    <>
      <Head>
        <title>{app?.name ? `${app.name} | ` : ''} Domains | Codelab</title>
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
