import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import type { IAppDto, IAtomDto } from '@codelab/shared/abstract/core'
import { useCallback, useEffect } from 'react'

/**
 * Fetch related data for rendering page, and load them into store
 */
export const useAppList = ({
  apps,
  atoms,
}: {
  apps: Array<IAppDto>
  atoms: Array<IAtomDto>
}): { apps: Array<IAppModel> } => {
  const {
    appDomainService,
    atomDomainService,
    domainDomainService,
    pageDomainService,
  } = useDomainStore()

  const hydrate = useCallback(() => {
    apps.forEach((app) => appDomainService.hydrate(app))
    atoms.forEach((atom) => atomDomainService.hydrate(atom))

    const pages = apps.flatMap((app) => app.pages ?? [])
    const domains = apps.flatMap((app) => app.domains ?? [])

    pages.forEach((page) => pageDomainService.hydrate(page))
    domains.forEach((domain) => domainDomainService.hydrate(domain))
  }, [apps, atoms])

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return {
    apps: appDomainService.appsList,
  }
}
