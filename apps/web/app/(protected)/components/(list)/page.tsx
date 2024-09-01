import { StoreHydrator } from '@codelab/frontend/infra/context'
import { atomListQuery } from '@codelab/frontend-application-atom/use-cases/get-atoms/server'
import { componentListQuery } from '@codelab/frontend-application-component/use-cases/component-list'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Components | Codelab',
}

const Page = async () => {
  const [{ items: components }, { items: atoms }] = await Promise.all([
    componentListQuery(),
    atomListQuery(),
  ])

  return (
    <StoreHydrator
      atomsDto={atoms}
      componentsDto={components}
      fallback={<Spinner center isLoading />}
    >
      <></>
    </StoreHydrator>
  )
}

export default Page
