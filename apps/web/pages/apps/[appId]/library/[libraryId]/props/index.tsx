import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { DashboardLayout } from 'apps/web/src/layout/DashboardLayout'
import React from 'react'
import { NextPageTemplate } from '../../../../../../src/templates/Layout.interface'

const PropTypeCDetail: NextPageTemplate<'dashboard'> = () => {
  return <div id="Builder" style={{ position: 'relative' }}></div>
}

export const getServerSideProps = withPageAuthRequired()

PropTypeCDetail.Template = DashboardLayout
// PropTypeCDetail.MainPane = PaneMainPropTypeC

export default PropTypeCDetail
