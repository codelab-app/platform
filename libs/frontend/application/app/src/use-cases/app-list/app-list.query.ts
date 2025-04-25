import { defaultAtomQuery } from '@codelab/frontend-application-atom/use-cases/atom-list/server'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { waitForTimeout } from '@codelab/frontend-shared-utils'
import { cache } from 'react'
import 'server-only'

export const appListQuery = cache(async () => {
  console.log('appListQuery')

  const user = await getServerUser()

  const [{ items: appsDto }, { items: atomsDto }] = await Promise.all([
    appRepository.findPreview({ owner: { id: user.id } }),
    defaultAtomQuery(),
  ])

  await waitForTimeout()

  const domainsDto = appsDto.flatMap((app) => app.domains)
  const pagesDto = appsDto.flatMap((app) => app.pages)

  return { appsDto, atomsDto, domainsDto, pagesDto }
})

export const preloadAppListQuery = () => {
  console.log('preloadAppListQuery')

  void appListQuery()
}
