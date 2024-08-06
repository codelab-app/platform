import type { IAppDomainService } from '@codelab/frontend/abstract/domain'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'
import type { IUpdatePageData } from '@codelab/shared/abstract/core'

export const updatePageService = async (
  data: IUpdatePageData,
  appDomainService: IAppDomainService,
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
    await pageRepository.update(page, {
      id: page.id,
    })
  }

  return
}
