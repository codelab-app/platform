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
  const { appDomainService, atomDomainService, pageDomainService } =
    useDomainStore()

  const hydrate = useCallback(() => {
    apps
      .flatMap((app) => {
        appDomainService.hydrate(app)

        return app.pages || []
      })
      .forEach((page) => {
        pageDomainService.hydrate(page)
      })

    atoms.forEach((atom) => {
      atomDomainService.hydrate(atom)
    })
  }, [apps, atoms])

  useEffect(() => {
    hydrate()
  }, [hydrate])

  return {
    apps: appDomainService.appsList,
  }
}
