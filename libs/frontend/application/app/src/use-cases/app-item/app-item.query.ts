import type { IDomainStoreDto } from '@codelab/frontend-abstract-domain'

import { waitForTimeout } from '@codelab/frontend-shared-utils'
import { defaultAtomQuery } from '@codelab/frontend-application-atom/use-cases/atom-list/server'
import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { cache } from 'react'
import 'server-only'

export type AppItemQueryProps = Pick<
  IDomainStoreDto,
  'appsDto' | 'atomsDto' | 'domainsDto'
>

export const appItemQuery = cache(async ({ appId }: { appId: string }) => {
  const [{ items: appsDto }, { items: atomsDto }] = await Promise.all([
    appRepository.findPreview({ id: appId }),
    defaultAtomQuery(),
  ])

  await waitForTimeout()

  const domainsDto = appsDto.flatMap((app) => app.domains)

  return { appsDto, atomsDto, domainsDto }
})

export const preloadAppItemQuery = (appId: string) => {
  void appItemQuery({ appId })
}
