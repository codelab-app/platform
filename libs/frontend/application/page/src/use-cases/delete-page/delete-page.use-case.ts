import type { IRendererService } from '@codelab/frontend/abstract/application'
import {
  type IDomainStore,
  type IPageModel,
} from '@codelab/frontend/abstract/domain'
import {
  deleteElementRepository,
  deleteElementUseCase,
} from '@codelab/frontend-application-element/use-cases/delete-element'
import {
  useDomainStore,
  useStore,
} from '@codelab/frontend-application-shared-store/provider'
import { deletePageRepository } from '@codelab/frontend-domain-page/actions'
import { Page } from '@codelab/frontend-domain-page/store'
import { pageListRepository } from '../get-pages/page-list.repository'

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
