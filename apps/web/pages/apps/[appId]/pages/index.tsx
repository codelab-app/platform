import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { NextPageTemplate } from '@codelab/frontend/abstract/props'
import { MainPanePage } from '@codelab/frontend/modules/page'
import { withAppQueryProvider } from '@codelab/frontend/presenter/container'
import { DashboardLayout } from 'apps/web/src/layout/DashboardLayout'
import React from 'react'

const Pages: NextPageTemplate<'dashboard'> = () => <></>

Pages.Template = withAppQueryProvider(DashboardLayout)
Pages.MainPane = MainPanePage

export const getServerSideProps = withPageAuthRequired()

export default Pages
