'use client'

import type { IDomainStoreDto } from '@codelab/frontend/abstract/domain'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useCallback, useEffect, useState } from 'react'

/**
 * A previous version of this called the hydrate synchronously without useEffect, but this causes delay and doesn't render immediately
 */
export const useHydrateStore = ({
  actionsDto,
  appsDto,
  atomsDto,
  authGuardsDto,
  componentsDto,
  elementsDto,
  fieldsDto,
  pagesDto,
  redirectsDto,
  resourcesDto,
  storesDto,
  typesDto,
}: IDomainStoreDto) => {
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

  useEffect(() => {
    hydrate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    actionsDto,
    appsDto,
    atomsDto,
    authGuardsDto,
    componentsDto,
    elementsDto,
    fieldsDto,
    pagesDto,
    redirectsDto,
    resourcesDto,
    storesDto,
    typesDto,
  ])

  const hydrate = useCallback(() => {
    appsDto?.forEach((app) => {
      appDomainService.hydrate(app)
      app.pages?.forEach((page) => {
        pageDomainService.hydrate(page)
      })
      app.domains?.forEach((domain) => {
        domainDomainService.hydrate(domain)
      })
    })

    atomsDto?.forEach((atom) => {
      atomDomainService.hydrate(atom)
    })

    typesDto?.forEach((type) => {
      typeDomainService.hydrate(type)
    })

    fieldsDto?.forEach((field) => {
      fieldDomainService.hydrate(field)
    })

    elementsDto?.forEach((element) => {
      elementDomainService.hydrate(element)
    })

    componentsDto?.forEach((component) => {
      componentDomainService.hydrate(component)
    })

    storesDto?.forEach((store) => {
      storeDomainService.hydrate(store)
    })

    actionsDto?.forEach((action) => {
      actionDomainService.hydrate(action)
    })

    resourcesDto?.forEach((resource) => {
      resourceDomainService.hydrate(resource)
    })

    authGuardsDto?.forEach((authGuard) => {
      authGuardDomainService.hydrate(authGuard)
    })

    redirectsDto?.forEach((redirect) => {
      redirectDomainService.hydrate(redirect)
    })

    pagesDto?.forEach((page) => {
      pageDomainService.hydrate(page)
    })

    setIsHydrated(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    actionsDto,
    appsDto,
    atomsDto,
    authGuardsDto,
    componentsDto,
    elementsDto,
    fieldsDto,
    pagesDto,
    redirectsDto,
    resourcesDto,
    storesDto,
    typesDto,
  ])

  return {
    apps: appDomainService.appsList,
  }
}
