import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { withAppQueryProvider } from '@codelab/frontend/shared'
import { DashboardLayout } from 'apps/web/src/layout/DashboardLayout'
import React from 'react'
import { MainPanePage } from '../../../../src/sections/panes'
import { NextPageTemplate } from '../../../../src/templates/Layout.interface'

const Pages: NextPageTemplate<'dashboard'> = () => <></>

Pages.Template = withAppQueryProvider(DashboardLayout)
Pages.MainPane = MainPanePage

export const getServerSideProps = withPageAuthRequired()

export default Pages
