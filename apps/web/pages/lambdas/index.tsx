import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { padding } from '@codelab/frontend/style'
import {
  CreateLambdaModal,
  DeleteLambdaModal,
  GetLambdasTable,
  UpdateLambdaModal,
} from '@codelab/modules/lambda'
import { PageHeader } from 'antd'
import { CreateLambdaButton } from 'libs/modules/lambda/src/createLambda/CreateLambdaButton'
import React from 'react'
import { NextPageTemplate } from '../../src/templates/Layout.interface'
import { MainDashboardTemplate } from '../../src/templates/MainDashboardTemplate'

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
