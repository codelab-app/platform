import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
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
  DashboardTemplateProps,
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

export const getServerSideProps = withPageAuthRequired()

const Header = () => {
  const pageHeaderButtons = [<CreateLambdaButton key={0} />]

  return (
    <PageHeader
      ghost={false}
      // onBack={() => router.back()}
      title="Lambdas"
      extra={pageHeaderButtons}
    />
  )
}

LambdasPage.Template = DashboardTemplate
LambdasPage.templateProps = {
  SidebarNavigation,
  Header,
}

export default LambdasPage
