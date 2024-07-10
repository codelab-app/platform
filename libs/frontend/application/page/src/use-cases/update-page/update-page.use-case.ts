import type { IDomainStore } from '@codelab/frontend/abstract/domain'
import type { IUpdatePageData } from '@codelab/shared/abstract/core'
import { updatePageRepository } from './update-page.repository'

export const updatePageUseCase = async (
  data: IUpdatePageData,
  { appDomainService }: IDomainStore,
) => {
  const app = appDomainService.apps.get(data.app.id)
  const page = app?.page(data.id)
  const { name, pageContentContainer, urlPattern } = data

  page?.writeCache({
    app,
    name,
    pageContentContainer,
    urlPattern,
  })

  if (page) {
    await updatePageRepository({
      update: page.toUpdateInput(),
      where: {
        id: page.id,
      },
    })
  }

  return
}
