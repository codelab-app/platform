import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { MainPanePage } from '@codelab/modules/page'
import { DashboardLayout } from 'apps/web/src/templates/DashboardLayout'
import React from 'react'

const Pages = () => <>Hi</>

Pages.Layout = DashboardLayout
Pages.MainPane = MainPanePage

export const getServerSideProps = withPageAuthRequired()

export default Pages
