import type { ReactNode } from 'react'

import { DomainStoreHydrator } from '@codelab/frontend/infra/context'
import { appItemQuery } from '@codelab/frontend-application-app/use-cases/app-item'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ appId: string }>
}) => {
  const { appId } = await params
  // Can't preload since we need data here
  // void preloadAppItemQuery(appId)
  const { appsDto, atomsDto, domainsDto } = await appItemQuery({ appId })

  return (
    <DomainStoreHydrator
      appsDto={appsDto}
      atomsDto={atomsDto}
      domainsDto={domainsDto}
      fallback={<>LoADING!!</>}
      pagesDto={appsDto.flatMap((app) => app.pages)}
    >
      {children}
    </DomainStoreHydrator>
  )
}

export default Layout
