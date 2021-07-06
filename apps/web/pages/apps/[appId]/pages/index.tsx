import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { withAppQueryProvider } from '@codelab/frontend/shared'
import { MainPanePage } from '@codelab/modules/page'
import { DashboardLayout } from 'apps/web/src/templates/DashboardLayout'
import React from 'react'
import { NextPageLayout } from '../../../../src/templates/Layout.d'

const Pages: NextPageLayout<'dashboard'> = () => <></>

Pages.Layout = withAppQueryProvider(DashboardLayout)
Pages.MainPane = MainPanePage

export const getServerSideProps = withPageAuthRequired()

export default Pages
