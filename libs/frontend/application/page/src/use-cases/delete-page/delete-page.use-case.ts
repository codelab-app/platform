import { type IPageModel } from '@codelab/frontend/abstract/domain'
import { useDomainStore, useStore } from '@codelab/frontend/infra/mobx'
import { deleteElementRepository } from '@codelab/frontend-domain-element/repositories'
import {
  deletePageRepository,
  pageListRepository,
} from '@codelab/frontend-domain-page/repositories'

export const useDeletePageUseCase = async (pageModel: IPageModel) => {
  const { elementDomainService, pageDomainService } = useDomainStore()
  const { rendererService } = useStore()
  const pages = await pageListRepository({ where: { id: pageModel.id } })
  const elements = pages.flatMap((page) => page.elements)

  elements.forEach((element) =>
    elementDomainService.elements.delete(element.id),
  )

  pages.forEach((page) => {
    rendererService.renderers.delete(page.id)

    pageDomainService.pages.delete(page.id)
  })

  await deleteElementRepository({
    where: { id_IN: elements.map((element) => element.id) },
  })

  await deletePageRepository({ id: pageModel.id })

  // TODO: refresh pages
}
