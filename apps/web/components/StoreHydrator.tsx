'use client'

import type { IHydrateableData } from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React, { useCallback, useEffect } from 'react'

export const StoreHydrator = observer<PropsWithChildren<IHydrateableData>>(
  ({
    actions,
    apps,
    atoms,
    authGuards,
    children,
    components,
    elements,
    fields,
    redirects,
    resources,
    stores,
    types,
  }) => {
    const {
      actionDomainService,
      appDomainService,
      atomDomainService,
      authGuardDomainService,
      componentDomainService,
      domainDomainService,
      elementDomainService,
      fieldDomainService,
      pageDomainService,
      redirectDomainService,
      resourceDomainService,
      storeDomainService,
      typeDomainService,
    } = useDomainStore()

    const hydrate = useCallback(() => {
      atoms?.forEach((atom) => atomDomainService.hydrate(atom))

      types?.forEach((type) => typeDomainService.hydrate(type))

      fields?.forEach((field) => fieldDomainService.hydrate(field))

      elements?.forEach((element) => elementDomainService.hydrate(element))

      components?.forEach((component) =>
        componentDomainService.hydrate(component),
      )

      // data.pages?.forEach((page) => pageDomainService.hydrate(page))

      stores?.forEach((store) => storeDomainService.hydrate(store))

      actions?.forEach((action) => actionDomainService.hydrate(action))

      resources?.forEach((resource) => resourceDomainService.hydrate(resource))

      authGuards?.forEach((authGuard) =>
        authGuardDomainService.hydrate(authGuard),
      )

      redirects?.forEach((redirect) => redirectDomainService.hydrate(redirect))

      apps?.forEach((app) => appDomainService.hydrate(app))

      apps
        ?.flatMap((app) => app.pages ?? [])
        .forEach((page) => pageDomainService.hydrate(page))

      apps
        ?.flatMap((app) => app.domains ?? [])
        .forEach((domain) => domainDomainService.hydrate(domain))
    }, [
      actions,
      apps,
      atoms,
      authGuards,
      components,
      elements,
      fields,
      redirects,
      resources,
      stores,
      types,
    ])

    useEffect(() => {
      hydrate()
    }, [hydrate])

    return <>{children}</>
  },
)
