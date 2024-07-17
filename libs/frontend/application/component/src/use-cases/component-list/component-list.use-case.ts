import { CACHE_TAGS } from '@codelab/frontend/abstract/domain'
import { getServerUser } from '@codelab/frontend-application-user/use-cases/server-user'
import { componentListRepository } from '@codelab/frontend-domain-component/repositories'
import { revalidateTag } from 'next/cache'

export const componentListUseCase = async () => {
  const owner = await getServerUser()

  return await componentListRepository({
    where: { owner },
  })
}

export const revalidateComponentListOperation = () =>
  revalidateTag(CACHE_TAGS.COMPONENTS_LIST)
