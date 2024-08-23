'use client'

import type { IHydrateableData } from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import {
  Stage,
  usePerformanceMark,
  usePerformanceReport,
} from '@shopify/react-performance'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React, { useCallback, useEffect, useState } from 'react'

export const StoreHydrator = observer<PropsWithChildren<IHydrateableData>>(
  ({
    actionsDto,
    appsDto,
    atomsDto,
    authGuardsDto,
    children,
    componentsDto,
    elementsDto,
    fieldsDto,
    pagesDto,
    redirectsDto,
    resourcesDto,
    storesDto,
    typesDto,
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

    const [isHydrated, setIsHydrated] = useState(false)

    const hydrate = useCallback(() => {
      atomsDto?.forEach((atom) => atomDomainService.hydrate(atom))

      typesDto?.forEach((type) => typeDomainService.hydrate(type))

      fieldsDto?.forEach((field) => fieldDomainService.hydrate(field))

      elementsDto?.forEach((element) => elementDomainService.hydrate(element))

      componentsDto?.forEach((component) =>
        componentDomainService.hydrate(component),
      )

      storesDto?.forEach((store) => storeDomainService.hydrate(store))

      actionsDto?.forEach((action) => actionDomainService.hydrate(action))

      resourcesDto?.forEach((resource) =>
        resourceDomainService.hydrate(resource),
      )

      authGuardsDto?.forEach((authGuard) =>
        authGuardDomainService.hydrate(authGuard),
      )

      redirectsDto?.forEach((redirect) =>
        redirectDomainService.hydrate(redirect),
      )

      appsDto?.forEach((app) => appDomainService.hydrate(app))

      pagesDto?.forEach((page) => pageDomainService.hydrate(page))

      appsDto
        ?.flatMap((app) => app.pages ?? [])
        .forEach((page) => pageDomainService.hydrate(page))

      appsDto
        ?.flatMap((app) => app.domains ?? [])
        .forEach((domain) => domainDomainService.hydrate(domain))
    }, [
      actionsDto,
      appsDto,
      atomsDto,
      authGuardsDto,
      componentsDto,
      elementsDto,
      fieldsDto,
      redirectsDto,
      resourcesDto,
      storesDto,
      typesDto,
      pagesDto,
    ])

    useEffect(() => {
      hydrate()
      setIsHydrated(true)
    }, [hydrate])

    // do not render children untill the store is hydrated with all the
    // specified entities. Othervise `assertIsDefined` may break the application
    return isHydrated ? <>{children}</> : null
  },
)
