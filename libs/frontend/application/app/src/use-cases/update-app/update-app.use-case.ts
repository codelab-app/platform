import type { IAppModel } from '@codelab/frontend/abstract/domain'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { refreshAppListAction } from '../app-list'
import { updateAppAction } from './update-app.action'

export const updateAppUseCase = async (app: IAppModel, update: IAppDto) => {
  app.writeCache(update)

  await updateAppAction({ update: app.toUpdateInput(), where: { id: app.id } })

  await refreshAppListAction()
}
