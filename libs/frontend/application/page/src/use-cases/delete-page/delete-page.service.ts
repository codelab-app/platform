import { type IPageModel } from '@codelab/frontend/abstract/domain'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'

export const useDeletePageService = async (pageModel: IPageModel) => {
  const { elementDomainService, pageDomainService } = useDomainStore()
  const { rendererService } = useApplicationStore()
  const { items: pages } = await pageRepository.find({ id: pageModel.id })
  const elements = pages.flatMap((page) => page.elements)

  elements.forEach((element) =>
    elementDomainService.elements.delete(element.id),
  )

  pages.forEach((page) => {
    rendererService.renderers.delete(page.id)

    pageDomainService.pages.delete(page.id)
  })

  await elementRepository.delete(elements)

  await pageRepository.delete([pageModel])

  // TODO: refresh pages
}
