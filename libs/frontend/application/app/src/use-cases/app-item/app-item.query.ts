import { defaultAtomQuery } from '@codelab/frontend-application-atom/use-cases/get-atoms/server'
import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { cache } from 'react'
import 'server-only'

export const appItemQuery = cache(async ({ appId }: { appId: string }) => {
  const [{ items: appsDto }, { items: atomsDto }] = await Promise.all([
    appRepository.findPreview({ id: appId }),
    defaultAtomQuery(),
  ])

  await new Promise((resolve) => setTimeout(resolve, 3000))

  const domainsDto = appsDto.flatMap((app) => app.domains)

  return { appsDto, atomsDto, domainsDto }
})

export const preloadAppItemQuery = (appId: string) => {
  void appItemQuery({ appId })
}
