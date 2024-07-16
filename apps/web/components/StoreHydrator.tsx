'use client'

import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import type { IAppDto, IAtomDto } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React, { useCallback, useEffect } from 'react'

interface StoreInitializerProps {
  apps?: Array<IAppDto>
  atoms?: Array<IAtomDto>
}

export const StoreHydrator = observer<PropsWithChildren<StoreInitializerProps>>(
  ({ apps, atoms, children }) => {
    const {
      appDomainService,
      atomDomainService,
      domainDomainService,
      pageDomainService,
    } = useDomainStore()

    const hydrate = useCallback(() => {
      apps?.forEach((app) => appDomainService.hydrate(app))
      atoms?.forEach((atom) => atomDomainService.hydrate(atom))

      const pages = apps?.flatMap((app) => app.pages ?? [])
      const domains = apps?.flatMap((app) => app.domains ?? [])

      pages?.forEach((page) => pageDomainService.hydrate(page))
      domains?.forEach((domain) => domainDomainService.hydrate(domain))
    }, [apps, atoms])

    useEffect(() => {
      hydrate()
    }, [hydrate])

    return <>{children}</>
  },
)
