import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import {
  CreateLambdaButton,
  CreateLambdaModal,
  DeleteLambdaModal,
  GetLambdasTable,
  UpdateLambdaModal,
} from '@codelab/frontend/modules/lambda'
import { padding } from '@codelab/frontend/style'
import { MainDashboardTemplate } from '@codelab/frontend/view/templates'
import { PageHeader } from 'antd'
import React from 'react'

const LambdasPage: NextPageTemplate<'dashboard'> = () => {
  const pageHeaderButtons = [<CreateLambdaButton key={0} />]

  return (
    <>
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

LambdasPage.Template = MainDashboardTemplate

export const getServerSideProps = withPageAuthRequired()

export default LambdasPage
