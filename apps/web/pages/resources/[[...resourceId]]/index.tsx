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
  UpdateResourceData,
  useCurrentResource,
  WithOperationService,
  WithResourceService,
} from '@codelab/frontend/modules/resource'
import { WithTypeService } from '@codelab/frontend/modules/type'
import {
  ConditionalView,
  SpinnerWrapper,
} from '@codelab/frontend/view/components'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import { observer } from 'mobx-react-lite'
import Head from 'next/head'
import React from 'react'
import tw from 'twin.macro'

const ResourceDataPage = observer<WithResourceService & WithTypeService>(
  ({ resourceService, typeService }) => (
    <>
      <PageHeader extra={[]} ghost={false} title="Resource Data" />
      <UpdateResourceData
        resourceService={resourceService}
        typeService={typeService}
      />
    </>
  ),
)

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
      <UpdateOperationModal operationService={operationService} />
      <DeleteOperationsModal operationService={operationService} />
      <GetOperationsTable
        operationService={operationService}
        resourceService={resourceService}
      />
    </>
  ),
)

const ResourcesPage: CodelabPage<DashboardTemplateProps> = observer(() => {
  const { operationService, resourceService, typeService } = useStore()
  const { resource, isLoading } = useCurrentResource(resourceService)

  return (
    <>
      <Head>
        <title>Resources | Codelab</title>
      </Head>
      <SpinnerWrapper isLoading={isLoading}>
        <ConditionalView condition={Boolean(resource)}>
          <ContentSection>
            <ResourceDataPage
              resourceService={resourceService}
              typeService={typeService}
            />
            <div css={tw`mb-5`} />
            <OperationPage
              operationService={operationService}
              resourceService={resourceService}
            />
          </ContentSection>
        </ConditionalView>
      </SpinnerWrapper>
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
