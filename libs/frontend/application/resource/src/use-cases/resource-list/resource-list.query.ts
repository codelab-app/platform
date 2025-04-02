import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { logTimestampMs } from '@codelab/shared/infra/logging'
import 'server-only'

export const resourceListQuery = async () => {
  logTimestampMs('Start resourcelistQuery')

  const user = await getServerUser()

  const { items: resourcesDto } = await resourceRepository.find(
    { owner: { id: user.id } },
    {},
    {
      tags: [CACHE_TAGS.Resource.list()],
    },
  )

  logTimestampMs('End resourceListQuery')

  return { resourcesDto }
}

export const preloadResourceListQuery = () => {
  void resourceListQuery()
}
