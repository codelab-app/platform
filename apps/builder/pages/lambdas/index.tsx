import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateLambdaButton,
  CreateLambdaModal,
  DeleteLambdaModal,
  GetLambdasTable,
  UpdateLambdaModal,
} from '@codelab/frontend/domain/lambda'
import { ContentSection } from '@codelab/frontend/view/sections'
import type { DashboardTemplateProps } from '@codelab/frontend/view/templates'
import { DashboardTemplate } from '@codelab/frontend/view/templates'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
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

export const getServerSideProps = auth0Instance.withPageAuthRequired()

LambdasPage.Layout = (page) => {
  return <DashboardTemplate Header={Header}>{page.children}</DashboardTemplate>
}
