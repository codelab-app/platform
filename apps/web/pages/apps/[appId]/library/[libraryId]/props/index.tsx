import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { PaneMainPropTypeC } from '@codelab/modules/prop-type'
import { LayoutBuilder } from 'apps/web/src/layout/Layout--builder'
import React from 'react'
import { NextPageLayout } from '../../../../../../src/layout/Layout.d'

const PropTypeCDetail: NextPageLayout<'builder'> = () => {
  return (
    <div id="Builder" style={{ position: 'relative' }}>
      Hi
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired()

PropTypeCDetail.Layout = LayoutBuilder
PropTypeCDetail.MainPane = PaneMainPropTypeC

export default PropTypeCDetail
