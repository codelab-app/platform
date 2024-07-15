import { type IPageModel } from '@codelab/frontend/abstract/domain'
import { deleteElementUseCase } from '@codelab/frontend-application-element/use-cases/delete-element'
import { deletePageRepository } from '@codelab/frontend-domain-page/actions'
import { Page } from '@codelab/frontend-domain-page/store'

export const deletePageUseCase = async (page: IPageModel) => {
  await deleteElementUseCase(page.rootElement.current)

  await deletePageRepository({ id: page.id }, Page.toDeleteInput())

  // TODO: refresh pages
}
