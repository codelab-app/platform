import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { App } from '@codelab/frontend-domain-app/store'
import { deleteElementRepository } from '@codelab/frontend-domain-element/actions'
import { invalidateAppListQuery } from '../app-list'
import { deleteAppRepository } from './delete-app.repository'

export const deleteAppUseCase = async (app: IAppModel) => {
  const elementsIds = app.pages.flatMap((page) => page.elementsIds)

  /**
   * - don't use deletePageUseCase because elements maybe not hydrate
   * - pages will be deleted inside app mutation
   */
  await deleteElementRepository(
    { id_IN: elementsIds },
    { props: { where: {} } },
  )
  await deleteAppRepository({
    delete: App.toDeleteInput(),
    where: { id: app.id },
  })

  await invalidateAppListQuery()
}
