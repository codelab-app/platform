import {
  type CodelabPage,
  ExplorerPaneType,
} from '@codelab/frontend/abstract/types'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared'
import {
  CreateResourceModal,
  DeleteResourceModal,
  ResourcesPrimarySidebar,
  UpdateResourceForm,
  UpdateResourceModal,
} from '@codelab/frontend/application/resource'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CuiHeader,
  CuiHeaderBreadcrumb,
} from '@codelab/frontend/presentation/codelab-ui'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
} from '@codelab/frontend/presentation/view'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const ResourcesPageHeader = observer(() => {
  const { resourceService } = useStore()
  const resource = resourceService.updateForm.resource

  return (
    <CuiHeader
      direction={
        <CuiHeaderBreadcrumb
          items={[{ title: 'Resources' }, { title: resource?.name || '' }]}
        />
      }
      logo={
        <Image
          alt="codelab logo"
          className="h-full w-full"
          preview={false}
          src="/logo.png"
        />
      }
    />
  )
})

const ResourcesPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { resourceService } = useStore()
  const resource = resourceService.updateForm.resource

  return (
    <>
      <Head>
        <title>Resources | Codelab</title>
      </Head>
      <ContentSection>
        <CreateResourceModal />
        <UpdateResourceModal />
        <DeleteResourceModal />

        {resource && <UpdateResourceForm />}
      </ContentSection>
    </>
  )
})

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
