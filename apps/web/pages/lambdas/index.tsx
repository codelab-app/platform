import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CodelabPage } from '@codelab/frontend/abstract/props'
import {
  CreateLambdaButton,
  CreateLambdaModal,
  DeleteLambdaModal,
  GetLambdasTable,
  UpdateLambdaModal,
} from '@codelab/frontend/modules/lambda'
import { padding } from '@codelab/frontend/style'
import {
  DashboardTemplate,
  SidebarNavigation,
} from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import Head from 'next/head'
import React from 'react'

const LambdasPage: CodelabPage = () => {
  const pageHeaderButtons = [<CreateLambdaButton key={0} />]

  return (
    <>
      <Head>
        <title>Lambdas | Codelab</title>
      </Head>

      <PageHeader
        ghost={false}
        // onBack={() => router.back()}
        title="Lambdas"
        extra={pageHeaderButtons}
      />
      <CreateLambdaModal />
      <UpdateLambdaModal />
      <DeleteLambdaModal />
      <section style={{ marginTop: padding.sm }}>
        <GetLambdasTable />
      </section>
    </>
  )
}

export const getServerSideProps = withPageAuthRequired()

LambdasPage.Template = DashboardTemplate
LambdasPage.Header = null
LambdasPage.MetaPane = null
LambdasPage.MainPane = null
LambdasPage.SidebarNavigation = SidebarNavigation

export default LambdasPage
