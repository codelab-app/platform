import { PageHeader } from '@ant-design/pro-components/lib'
import type { CodelabPage } from '@codelab/frontend/abstract/types'
import {
  CreateLambdaButton,
  CreateLambdaModal,
  DeleteLambdaModal,
  GetLambdasTable,
  UpdateLambdaModal,
} from '@codelab/frontend/domain/lambda'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import {
  ContentSection,
  DashboardTemplate,
} from '@codelab/frontend/presentation/view'
import { auth0Instance } from '@codelab/shared/infra/auth0'
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

export const getServerSideProps = auth0Instance().withPageAuthRequired()

LambdasPage.Layout = ({ children }) => {
  return <DashboardTemplate Header={Header}>{children()}</DashboardTemplate>
}
