'use client'

import type { IDomainStoreDto } from '@codelab/frontend/abstract/domain'

import {
  useDomainStore,
  useUndoManager,
} from '@codelab/frontend-infra-mobx/context'
import { runInAction } from 'mobx'
import { useCallback } from 'react'

/**
 * A previous version of this called the hydrate synchronously without useEffect, but this causes delay and doesn't render immediately
 */
export const useDomainStoreHydrator = () => {
  const undoManager = useUndoManager()

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

  const hydrate = useCallback(
    (data: IDomainStoreDto) => {
      const {
        actionsDto,
        appsDto,
        atomsDto,
        authGuardsDto,
        componentsDto,
        domainsDto,
        elementsDto,
        fieldsDto,
        pagesDto,
        redirectsDto,
        resourcesDto,
        storesDto,
        tagsDto,
        typesDto,
      } = data

      // logger.debug('Hydrating data', data)

      // we use optimistic updates in some parts of the app, wrapping with a single group action
      // makes it very easy to undo the entire hydration, in case if requested operation fails
      undoManager.withGroup('hydration-group-action', () => {
        /**
         * Batch the hydration to prevent multiple re-renders, otherwise data invariant will be violated
         */
        runInAction(() => {
          appsDto?.forEach((app) => {
            appDomainService.hydrate(app)
          })

          domainsDto?.forEach((domain) => {
            domainDomainService.hydrate(domain)
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

          tagsDto?.forEach((tag) => {
            tagDomainService.hydrate(tag)
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
        })
      })
    },
    [
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
      undoManager,
    ],
  )

  return hydrate
}
