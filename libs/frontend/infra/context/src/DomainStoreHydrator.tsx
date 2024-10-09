'use client'

import type { IDomainStoreDto } from '@codelab/frontend/abstract/domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { withProfiler } from '@sentry/react'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useState } from 'react'

type DomainStoreHydratorProps = IDomainStoreDto & {
  children: ReactNode
  fallback: ReactNode
}

/**
 * Server side renders all UI down the tree, but does not run `useEffect` until client.
 *
 * If we don't have fallback, it will assume all has been hydrated and render empty apps, but in fact we are still hydrating.
 *
 * Use a loading state to show fallback while hydrating
 *
 * Client components with `useEffect` will still render on server! This can be confusing
 */
export const DomainStoreHydrator = withProfiler(
  observer<DomainStoreHydratorProps>(
    ({
      actionsDto,
      appsDto,
      atomsDto,
      authGuardsDto,
      children,
      componentsDto,
      elementsDto,
      fallback,
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
        tagDomainService,
        typeDomainService,
      } = useDomainStore()

      const [isHydrated, setIsHydrated] = useState(false)

      const hydrate = useCallback(() => {
        atomsDto?.forEach((atom) => atomDomainService.hydrate(atom))

        const tagsDto = atomsDto?.flatMap((atom) => atom.tags)

        tagsDto?.forEach((tag) => tagDomainService.hydrate(tag))

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
      return isHydrated ? <>{children}</> : <>{fallback}</>
    },
  ),
  { name: 'DomainStoreHydrator' },
)
