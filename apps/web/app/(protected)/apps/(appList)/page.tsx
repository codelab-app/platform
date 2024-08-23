import { StoreHydrator } from '@codelab/frontend/infra/context'
import { LastNavigationDetails } from '@codelab/frontend/infra/shared'
import { AppList } from '@codelab/frontend-application-app/use-cases/app-list'
import { BuildAppModal } from '@codelab/frontend-application-app/use-cases/build-app'
import { CreateAppModal } from '@codelab/frontend-application-app/use-cases/create-app'
import { DeleteAppModal } from '@codelab/frontend-application-app/use-cases/delete-app'
import { UpdateAppModal } from '@codelab/frontend-application-app/use-cases/update-app'
import { defaultAtomQuery } from '@codelab/frontend-application-atom/use-cases/get-atoms/server'
import { appListQuery } from '@codelab/frontend-domain-app/repositories'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { ContentSection } from '@codelab/frontend-presentation-view/sections'
import {
  Stage,
  usePerformanceMark,
  usePerformanceReport,
} from '@shopify/react-performance'
import delay from 'lodash/delay'
import type { Metadata } from 'next'
import React, { Suspense, use } from 'react'

export const metadata: Metadata = {
  // description: '...',
  title: 'Apps | Codelab',
}

export const dynamic = 'force-dynamic'

const AppsRoute = async () => {
  const [{ items: appsDto }, { items: atomsDto }] = await Promise.all([
    appListQuery(),
    defaultAtomQuery(),
  ])

  // const { items: appsDto } = use(appListQuery())
  // const { items: atomsDto } = use(defaultAtomQuery())

  return (
    <>
      <CreateAppModal />
      <DeleteAppModal />
      <UpdateAppModal />
      <BuildAppModal />
      <ContentSection>
        {/* <StoreHydrator appsDto={appsDto} atomsDto={atomsDto}> */}
        <AppList appsDto={appsDto} atomsDto={atomsDto} />
        {/* </StoreHydrator> */}
      </ContentSection>
    </>
  )
}

export default AppsRoute
