import {
  type CodelabPage,
  ExplorerPaneType,
} from '@codelab/frontend/abstract/types'
import {
  CreateResourceModal,
  DeleteResourceModal,
  ResourcesList,
  ResourcesPrimarySidebar,
  UpdateResourceModal,
} from '@codelab/frontend/domain/resource'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation//codelab-ui'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
} from '@codelab/frontend/presentation/view'
import { withPageAuthRedirect } from '@codelab/frontend/shared/utils'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const ResourcesPageHeader = observer(() => (
  <CuiHeader
    direction={<CuiHeaderBreadcrumb items={[{ title: 'Resources' }]} />}
    logo={
      <Image
        alt="codelab logo"
        className="h-full w-full"
        preview={false}
        src="/logo.png"
      />
    }
  />
))

const ResourcesPage: CodelabPage<DashboardTemplateProps> = () => {
  return (
    <>
      <Head>
        <title>Resources | Codelab</title>
      </Head>
      <ContentSection>
        <CreateResourceModal />
        <UpdateResourceModal />
        <DeleteResourceModal />

        <ResourcesList />
      </ContentSection>
    </>
  )
}

export default ResourcesPage

export const getServerSideProps = withPageAuthRedirect()

ResourcesPage.Layout = observer(({ children }) => {
  return (
    <DashboardTemplate
      Header={ResourcesPageHeader}
      PrimarySidebar={{
        default: ExplorerPaneType.ResourceList,
        items: [
          {
            key: ExplorerPaneType.ResourceList,
            render: ResourcesPrimarySidebar,
          },
        ],
      }}
    >
      {children()}
    </DashboardTemplate>
  )
})
