import type { IAppService } from '@codelab/frontend/abstract/application'
import type { IAppModel } from '@codelab/frontend/abstract/domain'
import { deleteAppRepository } from '@codelab/frontend-domain-app/repositories'
import { App } from '@codelab/frontend-domain-app/store'
import { deleteElementRepository } from '@codelab/frontend-domain-element/repositories'
import { invalidateAppListQuery } from '../app-list'

export const deleteAppUseCase: IAppService['deleteApp'] = async (
  app: IAppModel,
) => {
  const elementsIds = app.pages.flatMap((page) => page.elementsIds)

  /**
   * - don't use deletePageUseCase because elements maybe not hydrate
   * - pages will be deleted inside app mutation
   */
  await deleteElementRepository({ where: { id_IN: elementsIds } })
  await deleteAppRepository([app])

  await invalidateAppListQuery()
}
