import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/model/infra/mobx'
import {
  CreateOperationButton,
  CreateOperationModal,
  DeleteOperationsModal,
  GetOperationsTable,
  ResourceMainPane,
  UpdateOperationModal,
  useCurrentResource,
  WithOperationService,
  WithResourceService,
} from '@codelab/frontend/modules/resource'
import { DisplayIf, Spinner } from '@codelab/frontend/view/components'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'

const OperationPage = observer<WithResourceService & WithOperationService>(
  ({ operationService, resourceService }) => (
    <>
      <PageHeader
        extra={[<CreateOperationButton operationService={operationService} />]}
        ghost={false}
        title="Operations"
      />
      <CreateOperationModal
        operationService={operationService}
        resourceService={resourceService}
      />
      <UpdateOperationModal
        operationService={operationService}
        resourceService={resourceService}
      />
      <DeleteOperationsModal operationService={operationService} />
      <GetOperationsTable
        operationService={operationService}
        resourceService={resourceService}
      />
    </>
  ),
)

const ResourcesPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { operationService, resourceService } = useStore()
  const { resource, isLoading } = useCurrentResource(resourceService)

  return (
    <>
      <Head>
        <title>Resources | Codelab</title>
      </Head>
      <Spinner isLoading={isLoading}>
        <DisplayIf condition={Boolean(resource)}>
          <ContentSection>
            <OperationPage
              operationService={operationService}
              resourceService={resourceService}
            />
          </ContentSection>
        </DisplayIf>
      </Spinner>
    </>
  )
})

ResourcesPage.Layout = observer((page) => {
  const resource = useStore()

  return (
    <DashboardTemplate
      MainPane={() => (
        <ResourceMainPane resourceService={resource.resourceService} />
      )}
      SidebarNavigation={SidebarNavigation}
    >
      {page.children}
    </DashboardTemplate>
  )
})

export const getServerSideProps = withPageAuthRequired()

export default ResourcesPage
