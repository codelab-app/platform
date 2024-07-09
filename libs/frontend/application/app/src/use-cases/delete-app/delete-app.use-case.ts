import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { App } from '@codelab/frontend-domain-app/store'
import { deleteElementAction } from '@codelab/frontend-domain-element/actions'
import { refreshAppListAction } from '../app-list'
import { deleteAppAction } from './delete-app.action'

export const deleteAppUseCase = async (app: IAppModel) => {
  const elementsIds = app.pages.flatMap((page) => page.elementsIds)

  /**
   * - don't use deletePageUseCase because elements maybe not hydrate
   * - pages will be deleted inside app mutation
   */
  await deleteElementAction({ id_IN: elementsIds }, { props: { where: {} } })
  await deleteAppAction({ delete: App.toDeleteInput(), where: { id: app.id } })

  await refreshAppListAction()
}
