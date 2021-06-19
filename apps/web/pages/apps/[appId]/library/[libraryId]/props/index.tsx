import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { DashboardLayout } from 'apps/web/src/templates/DashboardLayout'
import React from 'react'
import { NextPageLayout } from '../../../../../../src/templates/Layout.d'

const PropTypeCDetail: NextPageLayout<'dashboard'> = () => {
  return (
    <div id="Builder" style={{ position: 'relative' }}>
      Hi
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()

PropTypeCDetail.Layout = DashboardLayout
// PropTypeCDetail.MainPane = PaneMainPropTypeC

export default PropTypeCDetail
