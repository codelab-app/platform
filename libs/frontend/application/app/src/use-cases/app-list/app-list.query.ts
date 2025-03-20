import { defaultAtomQuery } from '@codelab/frontend-application-atom/use-cases/get-atoms/server'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { appRepository } from '@codelab/frontend-domain-app/repositories'
import { cache } from 'react'

export const appListQuery = cache(async () => {
  const user = await getServerUser()

  const [{ items: appsDto }, { items: atomsDto }] = await Promise.all([
    appRepository.findPreview({ owner: { id: user.id } }),
    defaultAtomQuery(),
  ])

  const domainsDto = appsDto.flatMap((app) => app.domains)

  return { appsDto, atomsDto, domainsDto }
})
