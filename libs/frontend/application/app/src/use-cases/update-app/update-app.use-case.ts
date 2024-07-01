import type { IAppModel } from '@codelab/frontend/abstract/domain'
import {
  refreshAppListAction,
  updateAppAction,
} from '@codelab/frontend-domain-app/actions'
import type { IAppDto } from '@codelab/shared/abstract/core'

export const updateAppUseCase = async (app: IAppModel, update: IAppDto) => {
  app.writeCache(update)
  await updateAppAction({ id: app.id }, app.toUpdateInput())

  await refreshAppListAction()
}
