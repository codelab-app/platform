import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
  CodelabPage,
  DashboardTemplateProps,
} from '@codelab/frontend/abstract/props'
import {
  CreateLambdaButton,
  CreateLambdaModal,
  DeleteLambdaModal,
  GetLambdasTable,
  UpdateLambdaModal,
} from '@codelab/frontend/modules/lambda'
import { ContentSection } from '@codelab/frontend/view/sections'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import Head from 'next/head'
import React from 'react'

const LambdasPage: CodelabPage<DashboardTemplateProps> = () => {
  return (
    <>
      <Head>
        <title>Lambdas | Codelab</title>
      </Head>

      <CreateLambdaModal />
      <UpdateLambdaModal />
      <DeleteLambdaModal />
      <ContentSection>
        <GetLambdasTable />
      </ContentSection>
    </>
  )
}

const Header = () => {
  const pageHeaderButtons = [<CreateLambdaButton key={0} />]

  return (
    <PageHeader
      extra={pageHeaderButtons}
      // onBack={() => router.back()}
      ghost={false}
      title="Lambdas"
    />
  )
}

export default LambdasPage

export const getServerSideProps = withPageAuthRequired()

LambdasPage.Layout = (page) => {
  return (
    <DashboardTemplate Header={Header} SidebarNavigation={SidebarNavigation}>
      {page.children}
    </DashboardTemplate>
  )
}
