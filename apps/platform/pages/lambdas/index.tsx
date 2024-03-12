import {
  type CodelabPage,
  MODEL_ACTION,
} from '@codelab/frontend/abstract/types'
import { CreateLambdaButton } from '@codelab/frontend/application/lambda'
import { withPageAuthRedirect } from '@codelab/frontend/application/shared/auth'
import type { ToolbarItem } from '@codelab/frontend/presentation/codelab-ui'
import {
  CuiHeader,
  CuiHeaderToolbar,
} from '@codelab/frontend/presentation/codelab-ui'
import type { DashboardTemplateProps } from '@codelab/frontend/presentation/view'
import { DashboardTemplate } from '@codelab/frontend/presentation/view'
import Head from 'next/head'
import React from 'react'

const LambdasPage: CodelabPage<DashboardTemplateProps> = () => {
  return (
    <>
      <Head>
        <title>Lambdas | Codelab</title>
      </Head>

      {/* <CreateLambdaModal />
      <UpdateLambdaModal />
      <DeleteLambdaModal />
      <ContentSection>
        <GetLambdasTable />
      </ContentSection> */}
    </>
  )
}

const Header = () => {
  const toolbarItems: Array<ToolbarItem> = [
    {
      icon: <CreateLambdaButton key={0} />,
      key: MODEL_ACTION.CreateLambda.key,
      title: 'Create Lambda',
    },
  ]

  return (
    <CuiHeader
      toolbar={<CuiHeaderToolbar items={toolbarItems} title="Lambda" />}
      // onBack={() => router.back()}
    />
  )
}

export default LambdasPage

export const getServerSideProps = withPageAuthRedirect()

LambdasPage.Layout = ({ children }) => {
  return <DashboardTemplate Header={Header}>{children()}</DashboardTemplate>
}
